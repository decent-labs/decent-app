import React, { useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { request } from '../../requests';

function Login() {
  const [, setCookie] = useCookies(['token']);
  const history = useHistory();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPassword('');
    setToken('');
  }, [error]);

  function sendRequest() {
    request('auth/login', 'POST', { email, password, token })
      .then(response => {
        setIsLoading(false);
        const expires = new Date();
        expires.setDate(expires.getDate() + parseInt(process.env.REACT_APP_TOKEN_COOKIE_EXPIRATION_DAYS, 10));
        setCookie('token', response.token, { expires, path: '/' });
        history.replace(location.state || { from: { pathname: '/' } });
      })
      .catch(error => {
        setIsLoading(false);
        setError(error);
      });
  }

  return (
    <Col>
      <h1>Login</h1>
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
        <Form.Group controlId='formPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='••••••••'
            autoComplete='current-password'
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='form2FA'>
          <Form.Label>2 Factor Authentication Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='123456'
            value={token}
            onChange={event => setToken(event.target.value)}
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
              Login
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
      <div className='text-center'>
        <Link to='/auth/forgot'>Forgot your password?</Link>
      </div>
    </Col>
  );
}

export default Login;
