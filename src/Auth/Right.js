import React, { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch
} from 'react-router-dom';

import BMxLogoColor from '../assets/images/bmx-logo-color.svg';
import Login from './Login';
import Forgot from './Forgot';

function Right() {
  const match = useRouteMatch();
  const [alert, setAlert] = useState(null);

  return (
    <Col className='d-flex flex-column my-3'>
      <Row className='flex-fill mx-auto'>
        <Col className='my-auto'>
          <Image src={BMxLogoColor} />
        </Col>
      </Row>
      <Row className='mx-5'>
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
          <Route path={`${match.path}/login`}>
            <Login />
          </Route>
          <Route path={`${match.path}/forgot`}>
            <Forgot alert={setAlert} />
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
