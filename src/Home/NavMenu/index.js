import React, {useState} from 'react';

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
import DatePicker from "react-datepicker";
import { request } from '../../requests';
import {Button} from "react-bootstrap";
import { format } from 'date-fns';
import {
  dataAddAction,
  dataLoadingErrorAction,
  dataUpdateAction
} from "../../redux/reducers/async";

function NavMenu() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();
  const [, , removeCookie] = useCookies(['token']);

  const account = useAsyncState(StateProperty.account);

  function searchPatient(event) {
    event.preventDefault();
    dispatch(dataUpdateAction(StateProperty.search, []));
    request(`patients?fname=${firstName}&lname=${lastName}&dob=${format(dob,'MM-dd-yyyy')}`)
      .then(results =>
        results.profile.map(curProfile =>
          request(`patients/${curProfile.id}/profile`)
            .then(response => {
              dispatch(dataAddAction(StateProperty.search, response.profile));
            })
            .catch(error => {
              dispatch(dataLoadingErrorAction(StateProperty.search, error));
            })
        )
      )
      .then(() => history.push('/patients/search'));
  }

  return (
    <Navbar className='d-flex justify-content-between px-0 pt-0'>
      <Form className='flex-grow-1 mr-4' onSubmit={searchPatient}>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text className='form-control bg-transparent border-right-0'>
              <Image src={BMxSearchIcon} />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control type='text' placeholder='First name' value={firstName}
                        onChange={event => setFirstName(event.target.value)}
                        className='media-body py-2 border-left-0 border'
                        required/>
          <Form.Control type='text' placeholder='Last name' value={lastName}
                        onChange={event => setLastName(event.target.value)}
                        className='media-body py-2 border'
                        required/>
          <div className="media-body">
            <DatePicker   selected={dob}
                          onChange={date => setDob(date)}
                          placeholderText='Date of birth'
                          
                          customInput={<Form.Control type='text'
                            className='py-2 border'
                          />
                          }
                          required
                          showMonthDropdown
                          showYearDropdown/>
          </div>
          <Button
            variant='primary'
            type='submit'
            size='sm'
            className='ml-2'
          >
            Search
          </Button>
        </InputGroup>
      </Form>
      <Nav activeKey="/">
        <Nav.Link href='#notifications'>
          <Image src={BMxNotificationIcon} />
        </Nav.Link>
        <NavDropdown
          title={
            <>
              <Image src={BMxProfileIcon} />
              <span className='ml-3'>{account.data.name}</span>
            </>
          }
          id='basic-nav-dropdown'
          alignRight
        >
          <LinkContainer to='/settings'>
            <NavDropdown.Item>Settings</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={() => {
            removeCookie('token', { path: '/' });
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
