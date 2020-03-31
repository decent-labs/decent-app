import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch
} from 'react-router-dom';

import BMxLogoColor from '../assets/images/bmx-logo-color.svg';
import Login from './Login';

function Right() {
  const match = useRouteMatch();

  return (
    <Col className='d-flex flex-column my-3'>
      <Row className='flex-fill mx-auto'>
        <Col className='my-auto'>
          <Image src={BMxLogoColor} />
        </Col>
      </Row>
      <Row className='mx-5'>
        <Switch>
          <Route path={`${match.path}/login`}>
            <Login />
          </Route>
          <Route path={match.path}>
            <Redirect replace to={`${match.path}/login`} />
          </Route>
        </Switch>
      </Row>
      <Row className='flex-fill' />
    </Col>
  );
}

export default Right;
