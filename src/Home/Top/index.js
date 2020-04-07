import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from 'react-bootstrap/Image';

import { useCookies } from 'react-cookie';

import BMxProfileIcon from '../../assets/images/bmx-profile-icon.svg';
import BMxSearchIcon from '../../assets/images/bmx-search-icon.svg';
import BMxNotificationIcon from '../../assets/images/bmx-notification-icon.svg';

function Top() {
  const [, , removeCookie] = useCookies(['token']);

  return (
    <Navbar bg="d-flex">
      <Form className="flex-grow-1 mr-4">
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text className="bg-transparent border-right-0"><Image src={BMxSearchIcon} /></InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control type='text' placeholder='Search by name' className='py-2 border-left-0 border' />
        </InputGroup>
      </Form>
      <Nav>
        <Nav.Link href="#notifications"><Image src={BMxNotificationIcon} /></Nav.Link>
        <NavDropdown title={<><Image src={BMxProfileIcon} />&nbsp;&nbsp;My Account</>} id="basic-nav-dropdown" alignRight>
          <NavDropdown.Item href="#action/3.1">Account Details</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={() => removeCookie('token')}>
            Log Out
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

export default Top;
