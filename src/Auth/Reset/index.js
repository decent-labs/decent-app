import React, { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { resetPassword } from '../../requests';

function ResetPassword({ alert }) {
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);

  const [newPassword, setNewPassword] = useState('');
  const [twoFaToken, setTwoFaToken] = useState('');
  const [email] = useState(query.get('email') || '');
  const [token] = useState(query.get('token') || '');

  const [error, setError] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const submitForm = () => {
    setError('');
    setButtonDisabled(true);

    return resetPassword(email, token, newPassword, twoFaToken)
      .then(_ => {
        setButtonDisabled(false);
        setNewPassword('');
        alert({ message: 'Password successfully reset!', variant: 'primary' });
        history.push('/auth/login');
      })
      .catch(error => {
        setButtonDisabled(false);
        setNewPassword('');
        setTwoFaToken('');
        setError(error);
      });
  }

  return (
    <Col>
      <h1>Password Reset</h1>
      <p>Please enter a new password for your account with email address <b>{email}</b>.</p>
      <Form onSubmit={event => event.preventDefault()}>
        <Form.Group controlId='formNewPassword'>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='••••••••'
            autoComplete='new-password'
            value={newPassword}
            onChange={event => setNewPassword(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='form2FA'>
          <Form.Label>2 Factor Authentication Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='123456'
            value={twoFaToken}
            onChange={event => setTwoFaToken(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formError'>
          {error && <Alert variant='danger'>{error}</Alert>}
        </Form.Group>
        <Button
          variant='primary'
          type='submit'
          block
          className='font-weight-bold'
          disabled={buttonDisabled}
          onClick={submitForm}
        >
          Reset Password
        </Button>
      </Form>
      <div className='text-center my-3'>
        <Link to='/auth/login'>Back to Login</Link>
      </div>
    </Col>
  );
}

export default ResetPassword;
