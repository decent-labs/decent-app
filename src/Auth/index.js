import React, {useCallback, useEffect, useState} from 'react';

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
import packageJson from '../../package.json';

import Login from './Login';
import Forgot from './Forgot';
import Reset from './Reset';
import Register from './Register';
import Invite from './Invite';
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";

const LeftHeroCol = styled(Col)`
  background: url(${BMxLoginSplash}) no-repeat center center;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
`;

function Auth() {
  const match = useRouteMatch();
  const requestError = useAsyncState(StateProperty.requestError);
  const [alert, setAlert] = useState(null);

  const autodismissingAlert = useCallback(info => {
    setAlert(info)
    setTimeout(() => setAlert(null), 5000)
  }, [setAlert])

  useEffect(()=>{
    if(requestError.data.message !== '')
      setAlert({message:requestError.data.message, variant: 'danger'});
    else
      setAlert(null);
  },[requestError.data.message])

  return (
    <Container fluid className='h-100'>
      <Row className='h-100'>
        <LeftHeroCol className='d-none d-md-flex flex-md-column align-content-center justify-content-end' md={4} lg={6}>
          <Image style={{alignSelf: 'center', "maxWidth": "65%", "height":"auto"}} src={BMxLogoTransparent} className='mb-4' />
          <small className='text-muted'>v{packageJson.version + '+' + process.env.REACT_APP_GIT_HASH}</small>
        </LeftHeroCol>
        <Col className='d-flex flex-column py-3 align-content-center scroll-col'>
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
          <Row className='mx-5 flex-grow-1 align-content-center justify-content-center'>
            <Col style={{maxWidth:'75%'}} className='justify-content-center'>
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
                  <Forgot alert={autodismissingAlert} />
                </Route>

                <Route path={`${match.path}/reset/:unknown`}>
                  <Redirect to={`${match.path}/reset`} />
                </Route>
                <Route path={`${match.path}/reset`}>
                  <Reset alert={autodismissingAlert} />
                </Route>

                <Route path={`${match.path}/register/:unknown`}>
                  <Redirect to={`${match.path}/register`} />
                </Route>
                <Route path={`${match.path}/register`}>
                  <Register />
                </Route>

                <Route path={`${match.path}/invite/:inviteCode`}>
                  <Invite alert={autodismissingAlert}/>
                </Route>
                <Route path={`${match.path}/invite`}>
                  <Redirect to={`${match.path}`} />
                </Route>

                <Route path={match.path}>
                  <Redirect to={`${match.path}/login`} />
                </Route>
              </Switch>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Auth;
