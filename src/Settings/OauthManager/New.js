import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useAsyncState } from '../../redux/actions/useAsyncState';
import { StateProperty } from '../../redux/reducers';
import {
  dataLoadingAction,
  dataAddAction,
  dataLoadingErrorAction
} from '../../redux/reducers/async';

import { request } from '../../requests';

function New({ alert }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [redirectURI, setRedirectURI] = useState('');

  const oauthApps = useAsyncState(StateProperty.oauthApps);
  const profiles = useAsyncState(StateProperty.userProfile);
  const hospitalOrg = profiles.data.profiles.find(
    curProfile => curProfile.profileType === 'hospitalOrg');

  return (
    <div>
      <h3>New OAuth Application</h3>
      <Form onSubmit={event => event.preventDefault()}>
        <Form.Group controlId='formName'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formRedirectURI'>
          <Form.Label>Redirect URI</Form.Label>
          <Form.Control
            type='text'
            value={redirectURI}
            onChange={event => setRedirectURI(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formError'>
          {oauthApps.error && <Alert variant='danger'>{oauthApps.error}</Alert>}
        </Form.Group>
        <Form.Group controlId='formSubmit'>
          <Button
            variant='primary'
            type='submit'
            className='font-weight-bold'
            disabled={oauthApps.isLoading}
            onClick={() => {
              dispatch(dataLoadingAction(StateProperty.oauthApps));
              request(`hospitalOrgs/${hospitalOrg.profileId}/oauthApplications`, 'POST', { name, redirectURI }) // TODO: don't hardcode the hospitalOrg
                .then(response => dispatch(dataAddAction(StateProperty.oauthApps, response)))
                .then(() => alert({ message: 'OAuth application created succesfully!', variant: 'primary' }))
                .then(() => history.push('...')) // this goes "up" one level
                .catch(error => {
                  dispatch(dataLoadingErrorAction(StateProperty.oauthApps, error));
                });
            }}
          >
            Create OAuth Application
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default New;
