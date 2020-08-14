import React, { useEffect, useState } from 'react';
import Alert from "react-bootstrap/Alert";
import {Button, Modal, Form, Col, Card} from "react-bootstrap";
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
import {format} from 'date-fns';

export default function TestResultModal({show, message, closeHandler, confirmHandler}) {
  const dispatch = useDispatch();
  const account = useAsyncState(StateProperty.account);
  const [cvdResult, setCvdResult] = useState('pending');
  const [testType, setTestType] = useState('');
  const [kitId, setKitId] = useState('');
  const [dateOfTest, setDateOfTest] = useState('');
  const [dateOfResults, setDateOfResults] = useState(format(new Date(),'yyyy-MM-dd'));
  const [labLocation, setLabLocation] = useState('');
  const [techName, ] = useState(account.data.name);
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
    if (['positive', 'negative'].includes((lastEntry.covidTestResult || '').toLowerCase())) {
        const value = [lastEntry.covidTestResult[0].toUpperCase(),lastEntry.covidTestResult.slice(1)].join('');
        setCvdResult(value);
    }
  }, [ rxDetails ]);

  const addPrescriptionData = () => {
      const failure = 'Failed to save diagnosis.';
      const data = {
        type: "testResult",
        description,
        testType,
        kitId,
        dateOfTest,
        dateOfResults,
        labLocation,
        techName
      };
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

  function resetState(){
    setCvdResult('pending');
    setTestType('');
    setKitId('');
    setDateOfTest('');
    setDateOfResults(format(new Date(),'yyyy-MM-dd'));
    setLabLocation('');
    setDescription('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    addPrescriptionData().then(() => {
        setError(null);
        resetState();
        closeHandler();
     })
  }

  function handleClose() {
    resetState();
    closeHandler();
  }

  return (
    <Modal centered show={show} onHide={handleClose} animation={false}>
      <Form onSubmit={e => handleSubmit(e)}>
        <Modal.Header closeButton>
          <Modal.Title>Record Covid Test Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error &&
          <Form.Row className="d-flex justify-content-center">
            <Alert
              variant='danger'
            >
              {error}
            </Alert>
          </Form.Row>
          }
          <Form.Row>
            <Form.Group className='required' lg={6} md={8} as={Col}
                        controlId='formTestType'>
              <Form.Label>Type of test</Form.Label>
              <Form.Control
                onChange={event => setTestType(event.target.value)}
                required
                defaultValue={testType}
                as="select">
                <option/>
                <option>PCR</option>
                <option>Antigen</option>
                <option>Antibody</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className='required' lg={6} md={8} as={Col}
                        controlId='formCvdResult'>
              <Form.Label>Outcome of Test</Form.Label>
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
            <Form.Group controlId='kitId' lg={6} md={8} as={Col}>
              <Form.Label>Kit ID</Form.Label>
              <Form.Control
                value={kitId}
                onChange={event => setKitId(event.target.value)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group className='required' lg={6} md={8} as={Col}>
              <Form.Label>Date of Test</Form.Label>
              <Form.Control
                type='date'
                placeholder='mm/dd/yy'
                autoComplete='dob'
                value={dateOfTest}
                onChange={event => setDateOfTest(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className='required' lg={6} md={8} as={Col}>
              <Form.Label>Date of Results</Form.Label>
              <Form.Control
                type='date'
                placeholder='mm/dd/yy'
                autoComplete='dob'
                value={dateOfResults}
                onChange={event => setDateOfResults(event.target.value)}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group className='required' lg={6} md={8} as={Col}>
              <Form.Label>Lab Location</Form.Label>
              <Form.Control
                value={labLocation}
                onChange={event => setLabLocation(event.target.value)}
              />
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
          <Form.Row>
            <Card>
              <Card.Subtitle className="form-label">Technician Name</Card.Subtitle>
              <Card.Text className="form-text small ml-3">{techName}</Card.Text>
            </Card>
          </Form.Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button className='styled-form-button' type='submit' variant="primary"
                  disabled={cvdResult === 'pending'}>
            Confirm
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
