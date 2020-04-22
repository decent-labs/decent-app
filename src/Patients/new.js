import React from 'react';
import {Col} from 'react-bootstrap';
import {useHistory} from "react-router-dom";
import {request} from "../requests";
import Form from './form';

function New({ alert }) {
  const history = useHistory();

  function handleSubmit(event, data) {
    event.preventDefault();
    return request('patients', 'POST', data)
      .then(response => {
        alert({ message: 'New Patient added successfully', variant: 'primary' });
        history.push('/patients');
      })
  }

  return (
    <Col>
      <h1>New Patient</h1>
      <Form submitHandler={handleSubmit}/>
    </Col>
  )
}
export default New;
