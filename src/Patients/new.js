import React, {useState} from 'react';
import {Col} from 'react-bootstrap';
import {useHistory} from "react-router-dom";
import {request} from "../requests";
import Form from './form';
import Alert from "react-bootstrap/Alert";
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";
import {dataAddAction, dataUpdateAction} from "../redux/reducers/async";
import {useDispatch} from "react-redux";
import {fetchUserProfiles} from "../redux/reducers/async/userProfile";

function New({ alert }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const profiles = useAsyncState(StateProperty.userProfile);
  function handleSubmit(event, formData) {
    event.preventDefault();
    let data;
    if(profiles.data.currentProfile.profileType === 'patient'){
      data = {...formData, userId: profiles.data.currentProfile.userId}
    }else{
      data = formData;
    }

    return request('patients', 'POST', data)
      .then(response => {
        alert({ message: 'Patient created successfully', variant: 'success' });
        dispatch(dataAddAction(StateProperty.patients, { ...response.profile, prescriptions:[] }))
        history.push(`/patients/${response.profile.id}`);
        if(profiles.data.currentProfile.profileType === 'patient') {
          return fetchUserProfiles()
            .then((response) => {
              dispatch(dataUpdateAction(StateProperty.userProfile, {
                currentProfile: profiles.data.currentProfile,
                profiles: response.profiles
              }))
            });
        }
      }).catch(error => {
        setError(error);
      })
  }

  return (
    <Col>
      {profiles.data.currentProfile.profileType === 'patient' ?
      <h1>Add Family Member</h1>:
      <h1>New Patient</h1>}
      <Form submitHandler={handleSubmit}/>
      {error && <Alert variant='danger'>{error}</Alert>}
    </Col>
  )
}
export default New;