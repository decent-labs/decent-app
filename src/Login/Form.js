import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { login } from '../requests';

function LoginForm({ authSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const updateEmail = event => setEmail(event.target.value);
  const updatePassword = event => setPassword(event.target.value);
  const updateTwoFa = event => setToken(event.target.value);

  const submitForm = () => {
    setError("");
    setButtonDisabled(true);

    return login(email, password, token)
      .then(response => {
        setButtonDisabled(false);
        setPassword("");
        authSuccess(response)
      })
      .catch(error => {
        setButtonDisabled(false);
        setPassword("");
        setError(error);
      });
  }

  return (
    <>
      <Form onSubmit={event => event.preventDefault()}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="you@email.com"
            autoComplete="username"
            value={email}
            onChange={updateEmail}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={updatePassword}
          />
        </Form.Group>
        <Form.Group controlId="form2FA">
          <Form.Label>2 Factor Authentication Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="123456"
            value={token}
            onChange={updateTwoFa}
          />
        </Form.Group>
        <Form.Group controlId="formError">
          <Form.Text className="text-danger">{error}</Form.Text>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          block
          className="font-weight-bold"
          disabled={buttonDisabled}
          onClick={submitForm}
        >
          Login
        </Button>
      </Form>
    </>
  );
}

export default LoginForm;
