import React, {useEffect} from 'react';

import { Col, Dropdown, Image, Row } from 'react-bootstrap';
import {Link, NavLink, useHistory} from 'react-router-dom';

import BMxLogoColor from '../../assets/images/bmx-logo-color.svg';
import BMxPatientIcon from '../../assets/images/bmx-patient-icon.svg';

import {useAsyncState} from "../../redux/actions/useAsyncState";
import {StateProperty} from "../../redux/reducers";
import {dataSetAction} from "../../redux/reducers/async";
import {useDispatch} from "react-redux";
import {useCookies} from "react-cookie";

function LeftMenu() {
  const userProfiles = useAsyncState(StateProperty.userProfile);
  const dispatch = useDispatch();
  const history = useHistory();
  const [cookies, setCookies] = useCookies();

  useEffect(()=>{
    if(cookies.currentProfile && typeof cookies.currentProfile === 'object')
      dispatch(dataSetAction(StateProperty.userProfile, {currentProfile:cookies.currentProfile, profiles:userProfiles.data.profiles}));
  },[cookies.currentProfile, dispatch, userProfiles.data.profiles])

  const profiles = userProfiles.data.profiles.map((curProfile)=>{
    return <Dropdown.Item
      key={(curProfile.profileId || '0') + curProfile.entityId + curProfile.entityName}
      active={cookies.currentProfile && curProfile.entityId === cookies.currentProfile.entityId}
      onSelect={() => {
        handleProfileSelect(curProfile);
      }}
    >
      {
        (curProfile.entityName.trim() || curProfile.profileType.trim())
      }
    </Dropdown.Item>;
  });

  function handleProfileSelect(profile) {
    setCookies('currentProfile',profile, {path: '/'});
    history.push('/');
  }

  function currentProfileDisplay() {
    return userProfiles.data.currentProfile.entityName.trim() || userProfiles.data.currentProfile.profileType.trim();
  }

  function getProfileDropdown() {
    if(userProfiles.data.profiles.length > 1){
      return (<Dropdown className="shadow rounded">
        <Dropdown.Toggle block variant="secondary" id="dropdown-basic">
          {currentProfileDisplay()}
        </Dropdown.Toggle>
        <Dropdown.Menu style={{margin: 0 }}>
          {profiles}
        </Dropdown.Menu>
      </Dropdown>)
    }
    return (<Dropdown className="shadow rounded">
      <Dropdown.Toggle block className='disabled' variant="secondary" id="dropdown-basic">
        {currentProfileDisplay()}
      </Dropdown.Toggle>
    </Dropdown>)
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
          {userProfiles.data.profiles.length > 0 &&
            getProfileDropdown()
          }
        </Col>
      </Row>
        <Row className='left-menu'>
          <Col>
            <NavLink to='/patients'>
              <Image className='mr-2' src={BMxPatientIcon}/>
              <span>Patients</span>
            </NavLink>
            {userProfiles.data.currentProfile.profileType === 'internal' &&
            <NavLink to='/physicians'>
              <span>Physicians</span>
            </NavLink>
            }
            {userProfiles.data.currentProfile.profileType === 'internal' &&
            <NavLink to='/labs'>
              <span>Laboratories</span>
            </NavLink>
            }
          </Col>
        </Row>
    </>
  )
}

export default LeftMenu;
