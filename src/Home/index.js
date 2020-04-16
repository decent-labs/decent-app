import React, {useCallback} from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import LeftMenu from './LeftMenu';
import NavMenu from './NavMenu';
import Main from './Main';
import {request} from "../requests";
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";

function Home() {
  const accountLoader = useCallback(() => request('auth/me', 'GET'), []);
  useAsyncState(StateProperty.account, accountLoader);
  const userProfileLoader = useCallback(() => request('auth/profiles', 'GET'), []);
  useAsyncState(StateProperty.userProfile, userProfileLoader);

  return (
    <Container fluid className='h-100 main-container'>
      <Row className='h-100'>
        <Col xs={4} md={3} lg={2} className='py-5 shadow bg-light d-flex flex-column'>
          <LeftMenu />
        </Col>
        <Col xs={8} md={9} lg={10} className='py-5 pl-4'>
          <NavMenu />
          <Row className='mt-4 pr-2'>
            <Col className='mt-1'>
              <Main />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
