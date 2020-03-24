import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import BMxLogoTransparent from './assets/images/bmx-logo-transparent.png';

function App() {
  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col className="login-splash d-flex">
          <Image src={BMxLogoTransparent} fluid className="align-self-end mb-5" />
        </Col>
        <Col>
          Hello BlockMedx
        </Col>
      </Row>
    </Container>
  );
}

export default App;
