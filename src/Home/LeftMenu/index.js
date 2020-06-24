import React, {useEffect} from 'react';

import { Col, Dropdown, Image, Row } from 'react-bootstrap';
import {Link, NavLink, useHistory} from 'react-router-dom';

import BMxLogoColor from '../../assets/images/bmx-logo-color.svg';
import BMxPatientIcon from '../../assets/images/bmx-patient-icon.svg';
import BMxPhysicianIcon from '../../assets/images/bmx-physician-icon.svg';
import BMxLabIcon from '../../assets/images/bmx-lab-icon.svg';

import {useAsyncState} from "../../redux/actions/useAsyncState";
import {StateProperty} from "../../redux/reducers";
import {dataSetAction} from "../../redux/reducers/async";
import {useDispatch} from "react-redux";
import {useCookies} from "react-cookie";
import isEqual from "lodash.isequal";

function LeftMenu() {
  const userProfiles = useAsyncState(StateProperty.userProfile);
  const dispatch = useDispatch();
  const history = useHistory();
  const [cookies, setCookies] = useCookies();

  useEffect(()=>{
    if(cookies.currentProfile && typeof cookies.currentProfile === 'object')
      dispatch(dataSetAction(StateProperty.userProfile, {currentProfile:cookies.currentProfile, profiles:userProfiles.data.profiles}));
  },[cookies.currentProfile, dispatch, userProfiles.data.profiles])

  const Profiles = () => userProfiles.data.profiles.map((curProfile)=>{
    return <Dropdown.Item
      key={(curProfile.profileId || '0') + curProfile.entityId + curProfile.entityName}
      active={!!cookies.currentProfile ? isEqual(cookies.currentProfile, curProfile) : isEqual(userProfiles.data.currentProfile, curProfile)}
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

  function CurrentProfileDisplay() {
    return userProfiles.data.currentProfile.entityName.trim() || userProfiles.data.currentProfile.profileType.trim();
  }

  function ProfileDropdown() {
    const many = userProfiles.data.profiles.length > 1

    return (
      <Dropdown className="shadow rounded">
        <Dropdown.Toggle block variant="secondary" className={`${many ? '' : 'disabled'} profile-dropdown`}>
          <CurrentProfileDisplay />
        </Dropdown.Toggle>
        {many && <Dropdown.Menu style={{margin: 0 }}>
          <Profiles />
        </Dropdown.Menu>}
      </Dropdown>
    )
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
          {userProfiles.data.profiles.length > 0 && <ProfileDropdown />}
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
              <Image className='mr-2' src={BMxPhysicianIcon}/>
              <span>Physicians</span>
            </NavLink>
            }
            {userProfiles.data.currentProfile.profileType === 'internal' &&
            <NavLink to='/labs'>
              <Image className='mr-2' src={BMxLabIcon}/>
              <span>Laboratories</span>
            </NavLink>
            }
          </Col>
        </Row>
    </>
  )
}

export default LeftMenu;
