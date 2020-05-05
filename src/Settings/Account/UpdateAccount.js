import React, { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import { useDispatch } from 'react-redux';

import { useAsyncState } from '../../redux/actions/useAsyncState';
import { StateProperty } from '../../redux/reducers';
import {
  dataLoadingAction,
  dataUpdateAction,
  dataLoadingErrorAction
} from '../../redux/reducers/async';

import { request } from '../../requests';

function UpdateAccount() {
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const account = useAsyncState(StateProperty.account);

  useEffect(() => {
    setFullName(account.data.name || '');
    setNewEmail(account.data.email || '');
  }, [account.data.email, account.data.name]);

  useEffect(() => {
    setOldPass('');
  }, [success, error])

  return (
    <div className='mb-4'>
      <h3>Update Account</h3>
      <Form onSubmit={event => event.preventDefault()}>
        <Form.Group controlId='formExistingPasswordUpdateAccount'>
          <Form.Label>Existing Password (for verification)</Form.Label>
          <Form.Control
            type='password'
            placeholder='••••••••'
            autoComplete='current-password'
            value={oldPass}
            onChange={event => setOldPass(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder={account.data.email}
            autoComplete='username'
            value={newEmail}
            onChange={event => setNewEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formName'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder={account.data.name}
            value={fullName}
            onChange={event => setFullName(event.target.value)}
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
              request('auth/account', 'PUT', { fullName, newEmail, oldPass })
                .then(response => dispatch(dataUpdateAction(StateProperty.account, response)))
                .then(() => setSuccess('Account succesfully updated!'))
                .catch(error => {
                  dispatch(dataLoadingErrorAction(StateProperty.account, error));
                  setError(error);
                });
            }}
          >
            Update Account
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default UpdateAccount;
