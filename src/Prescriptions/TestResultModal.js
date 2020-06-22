import React, { useEffect, useState } from 'react';
import Alert from "react-bootstrap/Alert";
import {Button, Modal, Form, Col} from "react-bootstrap";
import {request} from "../requests"
import { useAsyncState } from "../redux/actions/useAsyncState";
import {
  useParams,
} from 'react-router-dom';
import {
  dataSetAction
} from '../redux/reducers/async';
import {StateProperty} from "../redux/reducers";
import { useDispatch } from 'react-redux';
import isEmpty from 'lodash.isempty';
export default function TestResultModal({show, message, closeHandler, confirmHandler}) {
  const dispatch = useDispatch();
  const [cvdResult, setCvdResult] = useState('pending');
  const [error, setError] = useState(null);
  const [description, setDescription] = useState('');
  const { id, rxhash: selectedHash } = useParams();
  const patients = useAsyncState(StateProperty.patients);
  const patientDetails = patients.data.patients.find(curPatient => curPatient.id === parseInt(id));
  const rxDetails = patientDetails 
                    ? patientDetails.prescriptions.find(rx => rx.hash === selectedHash)
                    : {};

  useEffect(() => {
    if (!rxDetails)
      return;

    const log = rxDetails.data;

    if (isEmpty(log))
      return;

    let lastEntry;

    try {
         lastEntry = JSON.parse(log[log.length - 1].data);
    } catch (e) {
         return;
    }
    setDescription(lastEntry.description);
    if (['positive', 'negative'].includes((lastEntry.covidTestResult || '').toLowerCase())) {
        const value = [lastEntry.covidTestResult[0].toUpperCase(),lastEntry.covidTestResult.slice(1)].join('');
        setCvdResult(value);
    }
  }, [ rxDetails ]);

  const addPrescriptionData = () => {
      const failure = 'Failed to save diagnosis.';
      const data = { type: "testResult"
		     , description };
      if (cvdResult && cvdResult !== "pending") {
	  data.covidTestResult= cvdResult;
      }
      return request(`rxs/${selectedHash}/addOn`, 'POST', {data: data})
        .then(({ status, prescriptionAddOn }) => {
          if (status !== 'success') {
            throw new Error('failed to save');
          }

          rxDetails.data = (rxDetails.data || []).slice();
          rxDetails.data.splice(rxDetails.data.length, 0, { userId: prescriptionAddOn.userId,
                                                            data: prescriptionAddOn.data,
                                                            createdAt: prescriptionAddOn.createdAt
                                                          });							

          const otherRxs    = patientDetails.prescriptions.map(curRx => {
            if (curRx.hash !== selectedHash) return curRx;
            return rxDetails;
          });

          const otherPatients = patients.data.patients.map(curPatient => {
            if (curPatient.id !== parseInt(id)) return curPatient;
            return {
               ...curPatient,
               prescriptions: otherRxs
            }
          });

          dispatch(dataSetAction(StateProperty.patients,{
            patients: otherPatients
          }))

        }).catch(e => setError(failure))
  }

  function handleSubmit(event) {
    event.preventDefault();
    addPrescriptionData().then(() => {
        setError(null);
        setCvdResult('pending');
        setDescription('');
        closeHandler();
     })
  }

  function handleClose() {
    setCvdResult('pending');
    setDescription('');
    closeHandler();
  }

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Form onSubmit={e => handleSubmit(e)}>
      <Modal.Header closeButton>
        <Modal.Title>Record Covid Test Result</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { error &&
          <Form.Row className="d-flex justify-content-center">
          <Alert
            variant='danger'
           >
          {error}
          </Alert>
          </Form.Row>
        }
        <Form.Row>
          <Form.Group className='required' lg={6} md={8} as={Col} controlId='formCvdResult'>
          <Form.Label>Covid Diagnosis</Form.Label>
          <Form.Control 
            onChange={event => setCvdResult(event.target.value)}
            required
            defaultValue={cvdResult}
            as="select">
            <option>pending</option>
	    <option>Positive</option>
	    <option>Negative</option>
          </Form.Control>
          </Form.Group>
	  </Form.Row>
	  <Form.Row>
	  <Form.Group controlId='description' lg={6} md={8} as={Col}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
          </Form.Group>
        </Form.Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
          <Button className='styled-form-button' type='submit' variant="primary" disabled={cvdResult === 'pending'}>
          Confirm
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>
  )
}
