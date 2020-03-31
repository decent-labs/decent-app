import React, { useState } from 'react';

import { useCookies } from 'react-cookie';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory, useLocation } from 'react-router-dom';

import { login } from '../../requests';

function Login() {
  const [, setCookie] = useCookies(['token']);
  const history = useHistory();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const [error, setError] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { from } = location.state || { from: { pathname: '/' } };

  const submitForm = () => {
    setError('');
    setButtonDisabled(true);

    return login(email, password, token)
      .then(response => {
        setButtonDisabled(false);
        setPassword('');
        const expires = new Date();
        expires.setDate(expires.getDate() + parseInt(process.env.REACT_APP_TOKEN_COOKIE_EXPIRATION_DAYS, 10));
        setCookie('token', response.token, { expires });
        history.replace(from);
      })
      .catch(error => {
        setButtonDisabled(false);
        setPassword('');
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
          <Form.Text className='text-danger'>{error}</Form.Text>
        </Form.Group>
        <Button
          variant='primary'
          type='submit'
          block
          className='font-weight-bold'
          disabled={buttonDisabled}
          onClick={submitForm}
        >
          Login
        </Button>
      </Form>
      <div className='text-center my-3'>
        <a href='/'>Need help signing in?</a>
      </div>
    </Col>
  );
}

export default Login;
