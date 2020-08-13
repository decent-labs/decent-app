import React, {useState, useEffect} from 'react';
import {Col} from 'react-bootstrap';
import {useHistory, useParams} from "react-router-dom";
import {request} from "../requests";
import Form from './form';
import Alert from "react-bootstrap/Alert";
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";
import {dataAddAction, dataUpdateAction, dataLoadingAction, dataLoadingErrorAction} from "../redux/reducers/async";
import {useDispatch} from "react-redux";
import { getPrescriptionData } from "../redux/reducers/async/prescription";

function Edit({ alert }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const { id } = useParams();
  const profiles = useAsyncState(StateProperty.userProfile);
  const state = useAsyncState(StateProperty.patients);
  const patientDetails = (
    state.data && state.data.patients &&
    state.data.patients.find(patient => patient.id === parseInt(id))) || {};
  
  useEffect(() => {
    if (patientDetails.id || state.isLoading) return;

    dispatch(dataLoadingAction(StateProperty.patients));
    getPrescriptionData([request(`patients/${id}/profile`)])
    .then(response => {
      dispatch(dataAddAction(StateProperty.patients, response[0]))
    })
      .catch(error => {
        dispatch(dataLoadingErrorAction(StateProperty.patients, error));
        history.replace('..')
      });
  }, [dispatch, id, patientDetails, history, state.isLoading])

  function handleSubmit(event, formData) {
    event.preventDefault();
    let data;
    if(profiles.data.currentProfile.profileType === 'patient'){
      data = {...formData, userId: profiles.data.currentProfile.userId}
    }else{
      data = formData;
    }

    return request(`patients/${id}/profile`, 'PUT', data)
      .then(response => {
        alert({ message: 'Patient updated successfully', variant: 'success' });
        dispatch(dataUpdateAction(StateProperty.patients, response.updatedProfile))
        history.push(`/patients/${response.updatedProfile.id}`);
      }).catch(error => {
        setError(error);
      })
  }

  return (
    <Col>
      {profiles.data.currentProfile.profileType === 'patient' ?
      <h1>Edit Family Member</h1>:
      <h1>Edit Patient</h1>}
      <Form
        submitHandler={handleSubmit}
        firstName={patientDetails.firstName}
        lastName={patientDetails.lastName}
        dob={patientDetails.dob}
        phoneNumber={patientDetails.phoneNumber}
        ssn={patientDetails.ssn}
        streetAddress={patientDetails.streetAddress}
        streetAddress2={patientDetails.streetAddress2}
        city={patientDetails.city}
        state={patientDetails.state}
        zipCode={patientDetails.zipCode}
        id={id}
      />
      {error && <Alert variant='danger'>{error}</Alert>}
    </Col>
  )
}
export default Edit;
