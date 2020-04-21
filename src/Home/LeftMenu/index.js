import React from 'react';

import { Col, Container, Dropdown, Image, Row } from 'react-bootstrap';
import {Link, NavLink, useHistory} from 'react-router-dom';

import BMxLogoColor from '../../assets/images/bmx-logo-color.svg';

import {useAsyncState} from "../../redux/actions/useAsyncState";
import {StateProperty} from "../../redux/reducers";
import {dataUpdateAction} from "../../redux/reducers/async";
import {useDispatch} from "react-redux";

function LeftMenu() {
  const userProfiles = useAsyncState(StateProperty.userProfile);
  const dispatch = useDispatch();
  const history = useHistory();

  const profiles = userProfiles.data.profiles.map((curProfile)=>{
    return <Dropdown.Item
      key={curProfile.profileId}
      onSelect={() => {
        handleProfileSelect(curProfile.profileId);
      }}
    >
      {
        curProfile.profileType.charAt(0).toUpperCase() +
        curProfile.profileType.slice(1)
      }
    </Dropdown.Item>;
  });

  function handleProfileSelect(profile) {
    const currentProfile = userProfiles.data.profiles.find(curProfile => curProfile.profileId === profile);
    dispatch(dataUpdateAction(StateProperty.userProfile, {currentProfile, profiles:userProfiles.data.profiles}));
    history.push('/');
  }
  
  return (
    <>
      <Row className='mx-auto pt-2'>
        <Col>
          <Link to='' onClick={() => history.push('/')}>
            <Image fluid src={BMxLogoColor} />
          </Link>
        </Col>
      </Row>
      <Row className='mt-5 mb-4 pb-5 border-bottom'>
        <Col className='px-4'>
          <Dropdown className="shadow rounded">
            <Dropdown.Toggle block variant="secondary" id="dropdown-basic">
              Select Profile
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {profiles}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Container>
        <Row className='mx-auto left-menu'>
          <Col>
            <NavLink to='/patients'>Patients</NavLink>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default LeftMenu;
