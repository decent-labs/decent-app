import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { useCookies } from 'react-cookie';

import BMxLogoColor from '../assets/images/bmx-logo-color.svg';

function Home() {
  const [, , removeCookie] = useCookies(['token']);

  return (
    <Container fluid className='h-100 main-container'>
      <Row className='h-100'>
        <Col xs={4} md={3} lg={2} className='py-5 shadow bg-light d-flex flex-column'>
          <Row className='mx-auto'>
            <Col>
              <Image fluid src={BMxLogoColor} />
            </Col>
          </Row>
          <Row className='mt-5 mb-4 pb-5 border-bottom'>
            <Col>
              <Dropdown className="shadow rounded">
                <Dropdown.Toggle block variant="secondary" id="dropdown-basic">
                  Select Profile
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Patient</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Prescriber</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row className='mx-auto'>
            <Col>
              <Button
                variant='link'
                onClick={() => removeCookie('token')}
              >
                Log Out
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xs={8} md={7} lg={10}>
          
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
