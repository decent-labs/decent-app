import React, { useCallback } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from 'react-bootstrap/Image';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';

import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

import BMxProfileIcon from '../../assets/images/bmx-profile-icon.svg';
import BMxSearchIcon from '../../assets/images/bmx-search-icon.svg';
import BMxNotificationIcon from '../../assets/images/bmx-notification-icon.svg';

import { useAsyncState } from '../../redux/actions/useAsyncState';
import { StateProperty } from '../../redux/reducers';

import { request } from '../../requests';

function NavMenu() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [, , removeCookie] = useCookies(['token']);

  const accountLoader = useCallback(() => request('auth/me', 'GET'), []);
  const account = useAsyncState(StateProperty.account, accountLoader);

  return (
    <Navbar className='d-flex px-0 pt-0'>
      <Form className='flex-grow-1 mr-4'>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text className='bg-transparent border-right-0'>
              <Image src={BMxSearchIcon} />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control type='text' placeholder='Search by name' className='py-2 border-left-0 border' />
        </InputGroup>
      </Form>
      <Nav>
        <Nav.Link href='#notifications'>
          <Image src={BMxNotificationIcon} />
        </Nav.Link>
        <NavDropdown
          title={
            <>
              <Image src={BMxProfileIcon} />
              <span className='ml-3'>{account.data.name ? account.data.name : '...'}</span>
            </>
          }
          id='basic-nav-dropdown'
          alignRight
        >
          <LinkContainer to='/me'>
            <NavDropdown.Item>My Account</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={() => {
            removeCookie('token');
            dispatch({ type: 'RESET_APP' });
            history.push('/');
          }}>
            Log Out
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

export default NavMenu;
