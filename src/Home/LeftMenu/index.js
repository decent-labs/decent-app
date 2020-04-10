import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

import BMxLogoColor from '../../assets/images/bmx-logo-color.svg';

function LeftMenu() {
  return (
    <>
      <Row className='mx-auto'>
        <Col>
          <Link to='/'>
            <Image fluid src={BMxLogoColor} />
          </Link>
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
        <Col></Col>
      </Row>
    </>
  )
}

export default LeftMenu;
