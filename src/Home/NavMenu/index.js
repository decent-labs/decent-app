import React, { useEffect, useState } from 'react';
import qs from 'qs';
import isEmpty from 'lodash.isempty';
import { useDebounce } from 'use-debounce';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from 'react-bootstrap/Image';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import BMxProfileIcon from '../../assets/images/bmx-profile-icon.svg';
import BMxSearchIcon from '../../assets/images/bmx-search-icon.svg';

import { useAsyncState } from '../../redux/actions/useAsyncState';
import { StateProperty } from '../../redux/reducers';
import { formatHtmlDate } from "../../Common/form";

function NavMenu() {
  const userTypesAllowedSearch = ['prescriber', 'internal', 'labOrg', 'labAgent'];
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const [, , removeCookie] = useCookies(['token']);
  const { search } = useLocation();

  const account = useAsyncState(StateProperty.account);
  const userProfiles = useAsyncState(StateProperty.userProfile);

  useEffect( () => {
      const { fname, lname, dob: searchDob } = qs.parse(search.slice(1));

      if (! isEmpty(fname))
        setFirstName(fname);
      if (! isEmpty(lname))
        setLastName(lname);
      if (! isEmpty(searchDob)) {
        const [ searchDate, ] = moment.utc(searchDob).toISOString().split('T');
        setDob(searchDate);
      }
  }, [ dispatch, search ]);

  const buildQuery = (firstName, lastName, dob, history, search) => {
    const searchArray = [];
    
    if (!isEmpty(firstName)) searchArray.push(`fname=${firstName}`)
    if (!isEmpty(lastName)) searchArray.push(`lname=${lastName}`)
    if (!isEmpty(dob)) searchArray.push(`dob=${formatHtmlDate(dob)}`)

    if (searchArray.length === 0) {
      // to deal with a first-page-load race when state parameters are still being updated
      const { fname, lname, dob: searchDob } = qs.parse(search.slice(1));
      if (isEmpty(fname) && isEmpty(lname) && isEmpty(searchDob)) {
        history.push("/patients")
        return
      }
    }

    const query = searchArray.join("&")
    history.push(`/patients/search?${query}`);
  }

  const debounceLag = 250;

  const [debouncedSearch] = useDebounce(search, debounceLag);
  const [debouncedFirstName] = useDebounce(firstName, debounceLag);
  const [debouncedLastName] = useDebounce(lastName, debounceLag);
  const [debouncedDob]      = useDebounce(dob, debounceLag);
  const [debouncedHistory]   = useDebounce(history, debounceLag);

  useEffect(() => {
      buildQuery(debouncedFirstName, debouncedLastName, debouncedDob, debouncedHistory, debouncedSearch)
  }, [debouncedHistory, debouncedFirstName, debouncedLastName, debouncedDob, debouncedSearch])
  
  function searchPatient(event) {
    if (event) event.preventDefault();
    buildQuery(firstName, lastName, dob, history, search)
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
              placeholder='Last name'
              value={lastName}
              onChange={event => setLastName(event.target.value)}
              className='media-body py-2 border-left-0 border'
            />
            <Form.Control
              type='text'
              placeholder='First name'
              value={firstName}
              onChange={event => setFirstName(event.target.value)}
              className='media-body py-2 border'
            />
            <Form.Control
              type='date'
              defaultValue={dob}
              placeholder='Date of birth'
              autoComplete='dob'
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
            removeCookie('currentProfile', { path: '/' });
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
