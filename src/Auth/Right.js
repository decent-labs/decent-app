import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import BMxLogoColor from '../assets/images/bmx-logo-color.svg';
import Login from './Login';

function Right({ authSuccess }) {
  return (
    <Col className="d-flex flex-column my-3">
      <Row className="flex-fill mx-auto">
        <Col className="my-auto">
          <Image src={BMxLogoColor} />
        </Col>
      </Row>
      <Row className="mx-5">
        <Col>
          <h1>Login</h1>
          <Login authSuccess={authSuccess} />
          <div className="text-center my-3">
            <a href="/">Need help signing in?</a>
          </div>
        </Col>
      </Row>
      <Row className="flex-fill" />
    </Col>
  );
}

export default Right;
