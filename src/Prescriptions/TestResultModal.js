import React, { useState } from 'react';
import {Button, Modal, Form, Col} from "react-bootstrap";
import {request} from "../requests"
export default function TestResultModal({selectedHash, show, message, closeHandler, confirmHandler}) {
  const [cvdResult, setCvdResult] = useState('pending');
  const [description, setDescription] = useState('');

  const addPrescriptionData = () => {
      const data = { type: "testResult"
		     , description };
      if (cvdResult && cvdResult !== "pending") {
	  data.covidTestResult= cvdResult;
      }
      request(`rxs/${selectedHash}/addOn`, 
	      'POST', 
	      {data: data})
  }

  function handleSubmit(event) {
    addPrescriptionData()
  }
    
  return (
    <Modal show={show} onHide={closeHandler} animation={false}>
      <Form onSubmit={e => handleSubmit(e)}>
      <Modal.Header closeButton>
        <Modal.Title>Record Covid Test Result</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Row>
          <Form.Group className='required' lg={6} md={8} as={Col} controlId='formCvdResult'>
          <Form.Label>Covid Diagnosis</Form.Label>
          <Form.Control 
            onChange={event => setCvdResult(event.target.value)}
            required
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
        <Button variant="secondary" onClick={closeHandler}>
          Cancel
        </Button>
        <Button type='submit' variant="primary">
          Confirm
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>
  )
}
