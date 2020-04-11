import React, { useState, useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';

import { request } from '../../requests';

function ResetPassword({ alert }) {
  const history = useHistory();
  
  const query = new URLSearchParams(useLocation().search);
  const [email] = useState(query.get('email') || '');
  const [token] = useState(query.get('token') || '');

  const [newPassword, setNewPassword] = useState('');
  const [twoFaToken, setTwoFaToken] = useState('');

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNewPassword('');
    setTwoFaToken('');
  }, [error]);

  if (!email || !token) {
    alert({ message: 'Missing email or password reset token', variant: 'danger' });
    return <Redirect to='/auth/login' />;
  }

  function sendRequest() {
    request('password', 'PUT', { email, token, newPassword, twoFaToken })
      .then(() => {
        setIsLoading(false);
        alert({ message: 'Password successfully reset!', variant: 'primary' });
        history.push('/auth/login');
      })
      .catch(error => {
        setIsLoading(false);
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
        <Form.Row className='justify-content-center'>
          <Form.Group lg={6} md={8} as={Col} controlId='formSubmit'>
            <Button
              variant='primary'
              type='submit'
              block
              className='font-weight-bold'
              disabled={isLoading}
              onClick={() => sendRequest()}
            >
              Reset Password
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
      <div className='text-center'>
        <Link to='/auth/login'>Back to Login</Link>
      </div>
    </Col>
  );
}

export default ResetPassword;
