import React, { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import { useDispatch } from 'react-redux';

import { useAsyncState } from '../redux/actions/useAsyncState';
import { StateProperty } from '../redux/reducers';
import {
  dataLoadingAction,
  dataUpdateAction,
  dataLoadingErrorAction
} from '../redux/reducers/async';

import { request } from '../requests';

function UpdatePassword() {
  const dispatch = useDispatch();

  const [newPass, setNewPass] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [token, setToken] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const account = useAsyncState(StateProperty.account);

  useEffect(() => {
    setNewPass('');
    setOldPass('');
    setToken('');
  }, [success, error])

  return (
    <div className='mb-4'>
      <h3>Update Password</h3>
      <Form onSubmit={event => event.preventDefault()}>
        <Form.Group controlId='formNewPassword'>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='••••••••'
            autoComplete='new-password'
            value={newPass}
            onChange={event => setNewPass(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formExistingPassword'>
          <Form.Label>Existing Password (for verification)</Form.Label>
          <Form.Control
            type='password'
            placeholder='••••••••'
            autoComplete='current-password'
            value={oldPass}
            onChange={event => setOldPass(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='form2FA'>
          <Form.Label>2 Factor Authentication Code (for verification)</Form.Label>
          <Form.Control
            type='text'
            placeholder='123456'
            value={token}
            onChange={event => setToken(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formError'>
          {error && <Alert variant='danger'>{error}</Alert>}
          {success && <Alert variant='success'>{success}</Alert>}
        </Form.Group>
        <Form.Group controlId='formSubmit'>
          <Button
            variant='primary'
            type='submit'
            className='font-weight-bold'
            disabled={account.isLoading}
            onClick={() => {
              setSuccess('');
              dispatch(dataLoadingAction(StateProperty.account));
              request('auth/account', 'PUT', { newPass, oldPass, token })
                .then(response => dispatch(dataUpdateAction(StateProperty.account, response)))
                .then(() => setSuccess('Password succesfully updated!'))
                .catch(error => {
                  dispatch(dataLoadingErrorAction(StateProperty.account, error));
                  setError(error);
                });
            }}
          >
            Update Password
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default UpdatePassword;
