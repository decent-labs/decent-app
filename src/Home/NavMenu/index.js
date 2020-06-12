import React, { useState } from 'react';

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

import { useAsyncState } from '../../redux/actions/useAsyncState';
import { StateProperty } from '../../redux/reducers';
import { request } from '../../requests';
import {
  dataLoadingErrorAction,
  dataUpdateAction
} from "../../redux/reducers/async";
import { getPrescriptionData } from "../../Common/form";
import { formatHtmlDate } from "../../Common/form";

function NavMenu() {
  const userTypesAllowedSearch = ['prescriber', 'internal', 'labOrg', 'labAgent'];
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();
  const [, , removeCookie] = useCookies(['token']);

  const account = useAsyncState(StateProperty.account);
  const userProfiles = useAsyncState(StateProperty.userProfile);

  function searchPatient(event) {
    event.preventDefault();
    dispatch(dataUpdateAction(StateProperty.search, []));
    const searchArray = [];
    
    console.log({firstName, lastName, dob})
    
    if (firstName) searchArray.push(`fname=${firstName}`)
    if (lastName) searchArray.push(`lname=${lastName}`)
    if (dob) searchArray.push(`dob=${formatHtmlDate(dob)}`)

    if (searchArray.length === 0) return;
    console.log("FINNA SEARCH")

    const query = searchArray.join("&")

    request(`patients?${query}`)
      .then(results => {
        const profiles = results.profile.map(curProfile =>
          request(`patients/${curProfile.id}/profile`)
        )
        getPrescriptionData(profiles)
          .then(response => {
            dispatch(dataUpdateAction(StateProperty.search, response));
          })
          .catch(error => {
            dispatch(dataLoadingErrorAction(StateProperty.search, error));
          })
      }

      )
      .then(() => history.push('/patients/search'));
  }

  return (
    <Navbar className='d-flex justify-content-end px-0 pt-0'>
      {(userTypesAllowedSearch.includes(userProfiles.data.currentProfile.profileType)) &&
        <Form className='flex-grow-1 mr-4' onSubmit={searchPatient}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text
                className='form-control bg-transparent rounded-pill-left border-right-0'>
                <Image src={BMxSearchIcon} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type='text'
              placeholder='First name'
              value={firstName}
              onChange={event => setFirstName(event.target.value)}
              className='media-body py-2 border-left-0 border'
            />
            <Form.Control
              type='text'
              placeholder='Last name'
              value={lastName}
              onChange={event => setLastName(event.target.value)}
              className='media-body py-2 border'
            />
            <Form.Control
              type='date'
              placeholder='Date of birth'
              autoComplete='dob'
              value={dob}
              onChange={event => setDob(event.target.value)}
              className="rounded-pill-right"
            />
          </InputGroup>
          <input type="submit" style={{ display: "none" }} />
        </Form>
      }
      <Nav activeKey="/">
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
