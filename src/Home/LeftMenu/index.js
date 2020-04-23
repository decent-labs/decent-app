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
        curProfile.entityName.charAt(0).toUpperCase() +
        curProfile.entityName.slice(1)
      }
    </Dropdown.Item>;
  });

  function handleProfileSelect(profile) {
    const currentProfile = userProfiles.data.profiles.find(curProfile => curProfile.profileId === profile);
    dispatch(dataUpdateAction(StateProperty.userProfile, {currentProfile, profiles:userProfiles.data.profiles}));
    history.push('/');
  }

  function currentProfileDisplay() {
    const profileDisplayText = userProfiles.data.currentProfile.entityName || userProfiles.data.currentProfile.profileType;
    return profileDisplayText.charAt(0).toUpperCase() +
      profileDisplayText.slice(1)
  }

  return (
    <>
      <Row className='mx-auto pt-2'>
        <Col>
          <Link to='/'>
            <Image fluid src={BMxLogoColor} />
          </Link>
        </Col>
      </Row>
      <Row className='mt-5 mb-4 pb-5 border-bottom'>
        <Col className='px-4'>
          {userProfiles.data.profiles.length > 1 &&
            <Dropdown className="shadow rounded">
              <Dropdown.Toggle block variant="secondary" id="dropdown-basic">
                {currentProfileDisplay()}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{margin: 0 }}>
                {profiles}
              </Dropdown.Menu>
            </Dropdown>
          }
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
