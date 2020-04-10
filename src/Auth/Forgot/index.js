import React, { useState, useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Link, useHistory } from 'react-router-dom';

import { request } from '../../requests';

function ForgotPassword({ alert }) {
  const history = useHistory();

  const [email, setEmail] = useState('');

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEmail('');
  }, [error]);

  function sendRequest() {
    request('password', 'POST', { email })
      .then(() => {
        alert({ message: 'Password reset link sent to email', variant: 'primary' })
        history.push('/auth/login')
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        setError(error);
      });
  }

  return (
    <Col>
      <h1>Password Recovery</h1>
      <h4>Need help signing in?</h4>
      <p>We'll need you to provide your email address so we can send you a password reset link.</p>
      <Form onSubmit={event => event.preventDefault()}>
        <Form.Group controlId='formEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='you@email.com'
            autoComplete='username'
            value={email}
            onChange={event => setEmail(event.target.value)}
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
              Send Link
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

export default ForgotPassword;
