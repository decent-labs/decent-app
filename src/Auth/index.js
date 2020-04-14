import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch
} from 'react-router-dom';
import styled from 'styled-components'

import BMxLogoColor from '../assets/images/bmx-logo-color.svg';
import BMxLoginSplash from '../assets/images/bmx-login-splash.png';
import BMxLogoTransparent from '../assets/images/bmx-logo-transparent.png';

import Login from './Login';
import Forgot from './Forgot';
import Reset from './Reset';
import Register from './Register';

const LeftHeroCol = styled(Col)`
  background: url(${BMxLoginSplash}) no-repeat center center;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
`;

function Auth() {
  const match = useRouteMatch();
  const [alert, setAlert] = useState(null);

  return (
    <Container fluid className='h-100'>
      <Row className='h-100'>
        <LeftHeroCol className='d-none d-md-flex' md={4} lg={6}>
          <Image src={BMxLogoTransparent} fluid className='align-self-end mb-5' />
        </LeftHeroCol>
        <Col className='d-flex flex-column my-3'>
          <Row className='mx-auto mt-3 mb-5'>
            <Col className='my-auto'>
              <Image src={BMxLogoColor} />
            </Col>
          </Row>
          <Row className='mx-5 mt-3'>
            {alert && <Col>
              <Alert
                variant={alert.variant}
                dismissible
                onClose={() => setAlert(null)}
              >
                {alert.message}
              </Alert>
            </Col>
            }
          </Row>
          <Row className='mx-5'>
            <Switch>
              <Route path={`${match.path}/login/:unknown`}>
                <Redirect to={`${match.path}/login`} />
              </Route>
              <Route path={`${match.path}/login`}>
                <Login />
              </Route>

              <Route path={`${match.path}/forgot/:unknown`}>
                <Redirect to={`${match.path}/forgot`} />
              </Route>
              <Route path={`${match.path}/forgot`}>
                <Forgot alert={setAlert} />
              </Route>
              
              <Route path={`${match.path}/reset/:unknown`}>
                <Redirect to={`${match.path}/reset`} />
              </Route>
              <Route path={`${match.path}/reset`}>
                <Reset alert={setAlert} />
              </Route>
              <Route path={`${match.path}/register`}>
                <Register />
              </Route>
              
              <Route path={match.path}>
                <Redirect to={`${match.path}/login`} />
              </Route>
            </Switch>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Auth;
