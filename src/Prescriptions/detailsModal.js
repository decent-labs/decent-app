import React, { useEffect, useState } from 'react';
import {Button, Modal, Form, Card} from "react-bootstrap";
import { useAsyncState } from "../redux/actions/useAsyncState";
import {
  useParams,
} from 'react-router-dom';
import {StateProperty} from "../redux/reducers";
import isEmpty from 'lodash.isempty';
export default function DetailsModal({show, closeHandler}) {
  const { id, rxhash: selectedHash } = useParams();
  const patients = useAsyncState(StateProperty.patients);
  const patientDetails = patients.data.patients.find(curPatient => curPatient.id === parseInt(id));
  const [rxDetails, setRxDetails] = useState({});
  const [diagnosis, setDiagnosis] = useState('');
  const [testType, setTestType] = useState('');
  const [kitId, setKitId] = useState('');
  const [dateOfTest, setDateOfTest] = useState('');
  const [dateOfResults, setDateOfResults] = useState('');
  const [labLocation, setLabLocation] = useState('');
  const [techName, setTechName] = useState('');
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
      setTestType(results.testType);
      setKitId(results.kitId);
      setDateOfTest(results.dateOfTest);
      setDateOfResults(results.dateOfResults);
      setLabLocation(results.labLocation);
      setTechName(results.techName);
      setDescription(results.description);
    }else{
      setDiagnosis('');
      setTestType('');
      setKitId('');
      setDateOfTest('');
      setDateOfResults('');
      setLabLocation('');
      setTechName('');
      setDescription('');
    }
  }, [rxDetails, rxDetails.data])

  const close = () => {
    setRxDetails({})
    setDiagnosis("")
    setDescription("")
    closeHandler()
  }

  return (
    <Modal show={show} onHide={close} animation={false}>
      <Form className='details-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Test Kit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mb-4">
            <Card.Title className="mb-3">Instructions</Card.Title>
            <Card.Subtitle className="form-label">Directions</Card.Subtitle>
            <Card.Text className="form-text small">{rxDetails.directions}</Card.Text>
            {!isEmpty(rxDetails.notes) && <>
              <Card.Subtitle className="form-label">Notes</Card.Subtitle>
              <Card.Text className="form-text small">{rxDetails.notes}</Card.Text>
            </>}
          </Card>

          {!isEmpty(diagnosis) &&
            <Card className="mb-4">
              <Card.Title className="mb-3">Results</Card.Title>
              <Card.Subtitle className="form-label">Diagnosis</Card.Subtitle>
              <Card.Text className={`${diagnosis === 'Positive' ? 'positive' : 'negative'} form-text small`}>{diagnosis}</Card.Text>
              <Card.Subtitle className="form-label">Description</Card.Subtitle>
              <Card.Text className="form-text small">{description}</Card.Text>
              <Card.Subtitle className="form-label">Test Type</Card.Subtitle>
              <Card.Text className="form-text small">{testType}</Card.Text>
              <Card.Subtitle className="form-label">Kit ID</Card.Subtitle>
              <Card.Text className="form-text small">{kitId}</Card.Text>
              <Card.Subtitle className="form-label">Date of Test</Card.Subtitle>
              <Card.Text className="form-text small">{dateOfTest}</Card.Text>
              <Card.Subtitle className="form-label">Date of Results</Card.Subtitle>
              <Card.Text className="form-text small">{dateOfResults}</Card.Text>
              <Card.Subtitle className="form-label">Lab Location</Card.Subtitle>
              <Card.Text className="form-text small">{labLocation}</Card.Text>
              <Card.Subtitle className="form-label">Technician Name</Card.Subtitle>
              <Card.Text className="form-text small">{techName}</Card.Text>
            </Card>
          }
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
