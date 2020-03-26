import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Left from './Left';
import Right from './Right';

function Login({ authSuccess }) {
  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Left className="d-none d-md-flex" />
        <Right authSuccess={authSuccess} />
      </Row>
    </Container>
  );
}

export default Login;
