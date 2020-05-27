import React, {useState} from 'react';
import {Col} from 'react-bootstrap';
import {useHistory} from "react-router-dom";
import {request} from "../requests";
import Form from './form';
import Alert from "react-bootstrap/Alert";
import {StateProperty} from "../redux/reducers";
import {dataAddAction} from "../redux/reducers/async";
import {useDispatch} from "react-redux";

export default function New({ alert }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  function handleSubmit(event, formData) {
    event.preventDefault();
    const data = formData;
    return request('labOrgs', 'POST', data)
      .then(response => {
        alert({ message: 'New Lab added successfully', variant: 'success' });
        dispatch(dataAddAction(StateProperty.labs, { currentLab: response}))
        history.push(`/labs/${response.labOrgInfo.id}`);
      }).catch(error => {
        setError(error);
      })
  }

  return (
    <Col>
      <h1>New Lab</h1>
      <Form submitHandler={handleSubmit}/>
      {error && <Alert variant='danger'>{error}</Alert>}
    </Col>
  )
}
