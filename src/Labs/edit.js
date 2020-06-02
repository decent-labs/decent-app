import React, {useEffect, useState} from 'react';
import {Col, Button } from 'react-bootstrap';
import {useHistory, useParams} from "react-router-dom";
import {request} from "../requests";
import Form from './form';
import Alert from "react-bootstrap/Alert";
import {StateProperty} from "../redux/reducers";
import {
  dataLoadingAction,
  dataAddAction,
  dataLoadingErrorAction
} from '../redux/reducers/async';
import {useDispatch} from "react-redux";
import {useAsyncState} from "../redux/actions/useAsyncState";
export default function Edit({ alert }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const { id } = useParams();
  const state = useAsyncState(StateProperty.labs);
    const labDetails = (state.data.labs && 
	state.data.labs.data.find && 
	state.data.labs.data.find($lab => $lab.id === parseInt(id)))
	|| {};
  useEffect(() => {
    if (labDetails && labDetails.users) return;
    dispatch(dataLoadingAction(StateProperty.labs));
      request(`labOrgs/${id}/profile`, 'GET')
      .then(response => {
	  request(`labOrgs/${id}/users`, 'GET')
	      .then(usersResponse => {
		  const labProfile = {
		      ...response.profile,
		      users: [...usersResponse.users.admins, ...usersResponse.users.nonAdmins]
		  };
		  dispatch(dataAddAction(StateProperty.labs, {
		      currentLab: response.profile,
		      agents: [],
		      labs: { ...state.data.labs, data: [ labProfile , ...state.data.labs.data || []] },
		  }))
	      })

      })
      .catch(error => {
        dispatch(dataLoadingErrorAction(StateProperty.labs, error));
        history.replace(`/labs/${id}`);
      });
  }, [dispatch, id, labDetails, history, state.data.labs])
  function handleSubmit(event, formData) {
    event.preventDefault();
    const data = formData;
    return request(`labOrgs/${id}/profile`, 'PUT', data)
      .then(response => {
        alert({ message: 'Lab updated successfully', variant: 'success' });
        history.push(`/labs/${response.updatedProfile.id}`);
      }).catch(error => {
        setError(error);
      })
  }
    const deleteLab = async () => {
	await request(`labOrgs/${id}/profile`, 'DELETE');
        history.replace('..')
    }
  return (
    <Col>
      <h1>Edit Lab</h1>
      <Form 
        submitHandler={handleSubmit}
        name={labDetails.name}
        zipCode={labDetails.zipCode}
        streetAddress={labDetails.streetAddress}
        streetAddrress2={labDetails.streetAddress2}
        country={labDetails.country}
        city={labDetails.city}
        state={labDetails.state}
        phoneNumber={labDetails.phoneNumber}
        id={id}
	  />
      {error && <Alert variant='danger'>{error}</Alert>}
	  <Button onClick={deleteLab}>Delete Lab</Button>
    </Col>
  )
}
