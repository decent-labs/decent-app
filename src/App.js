import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import BMxLogoTransparent from './assets/images/bmx-logo-transparent.png';
import BMxLogoColor from './assets/images/bmx-logo-color.svg';

function App() {
  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col className="login-splash d-flex">
          <Image src={BMxLogoTransparent} fluid className="align-self-end mb-5" />
        </Col>
        <Col className="d-flex flex-column my-3">
          <Row className="flex-fill mx-auto">
            <Col className="my-auto">
              <Image src={BMxLogoColor} />
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Hello BlockMedx</p>
            </Col>
          </Row>
          <Row className="flex-fill" />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
