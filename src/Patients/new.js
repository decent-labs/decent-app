import React, {useState} from 'react';
import {Col} from 'react-bootstrap';
import {useHistory} from "react-router-dom";
import {request} from "../requests";
import Form from './form';
import Alert from "react-bootstrap/Alert";

function New({ alert }) {
  const history = useHistory();
  const [error, setError] = useState('');

  function handleSubmit(event, data) {
    event.preventDefault();
    return request('patients', 'POST', data)
      .then(response => {
        alert({ message: 'New Patient added successfully', variant: 'primary' });
        history.push('/patients');
      }).catch(error => {
        setError(error);
      })
  }

  return (
    <Col>
      <h1>New Patient</h1>
      <Form submitHandler={handleSubmit}/>
      <Form.Group controlId='formError'>
        {error && <Alert variant='danger'>{error}</Alert>}
      </Form.Group>
    </Col>
  )
}
export default New;
