import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function LoginForm() {
  return (
    <>
      <Form>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="you@email.com" autoComplete="username" />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" autoComplete="current-password" />
        </Form.Group>
        <Form.Group controlId="form2FA">
          <Form.Label>2 Factor Authentication Code</Form.Label>
          <Form.Control type="text" placeholder="123456" />
        </Form.Group>
        <Button variant="primary" type="submit" block className="font-weight-bold">
          Login
        </Button>
      </Form>
    </>
  );
}

export default LoginForm;
