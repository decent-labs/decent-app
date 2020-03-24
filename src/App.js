import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import styled from 'styled-components'

import BMxLoginSplash from './assets/images/bmx-login-splash.png';
import BMxLogoTransparent from './assets/images/bmx-logo-transparent.png';
import BMxLogoColor from './assets/images/bmx-logo-color.svg';

const LeftHero = styled(Col)`
  background: url(${BMxLoginSplash}) no-repeat center center;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
`;

function App() {
  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <LeftHero className="d-flex">
          <Image src={BMxLogoTransparent} fluid className="align-self-end mb-5" />
        </LeftHero>
        <Col className="d-flex flex-column my-3">
          <Row className="flex-fill mx-auto">
            <Col className="my-auto">
              <Image src={BMxLogoColor} />
            </Col>
          </Row>
          <Row>
            <Col>
              <h1>Login</h1>
            </Col>
          </Row>
          <Row className="flex-fill" />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
