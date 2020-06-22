import React, { useEffect, useState } from 'react';
import {Button, Modal, Form, Col} from "react-bootstrap";
import { useAsyncState } from "../redux/actions/useAsyncState";
import {
  useParams,
} from 'react-router-dom';
import {StateProperty} from "../redux/reducers";
import isEmpty from 'lodash.isempty';
export default function DetailsModal({show, message, closeHandler, confirmHandler}) {
  const { id, rxhash: selectedHash } = useParams();
  const patients = useAsyncState(StateProperty.patients);
  const patientDetails = patients.data.patients.find(curPatient => curPatient.id === parseInt(id));
  const [rxDetails, setRxDetails] = useState({});
  const [diagnosis, setDiagnosis] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => {
    if(!!selectedHash){
      setRxDetails(patientDetails.prescriptions.find(rx => rx.hash === selectedHash));
    }
  }, [selectedHash, patientDetails.prescriptions])

  useEffect(() => {
    if(!!rxDetails && !isEmpty(rxDetails.data)){
      const results = JSON.parse(rxDetails.data.slice(-1).pop().data);
      setDiagnosis(results.covidTestResult);
      setDescription(results.description);
    }else{
      setDiagnosis('');
      setDescription('');
    }
  }, [rxDetails, rxDetails.data])

  return (
    <Modal show={show} onHide={closeHandler} animation={false}>
      <Form className='details-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Covid Test Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Form.Row>
            <Form.Group className='required' lg={6} md={8} as={Col} controlId='formCvdResult'>
              <Form.Label>Covid Diagnosis</Form.Label>
              <Form.Text className={diagnosis === 'Positive' ? 'positive' : 'negative'}>{diagnosis}</Form.Text>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId='description' lg={6} md={8} as={Col}>
              <Form.Label>Description</Form.Label>
              <Form.Text>{description}</Form.Text>
            </Form.Group>
          </Form.Row>
        </Modal.Body>
        <Modal.Footer>
          <Button className='styled-form-button' variant="primary" onClick={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
