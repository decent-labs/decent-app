import React, {useCallback} from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import LeftMenu from './LeftMenu';
import NavMenu from './NavMenu';
import Main from './Main';
import {request} from "../requests";
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";

function Home() {
  const accountLoader = useCallback(() => request('auth/me', 'GET'), []);
  useAsyncState(StateProperty.account, accountLoader);
  const userProfileLoader = useCallback(() => {
    return request('auth/profiles', 'GET')
      .then((response) => {
        return {
          currentProfile: response.profiles[0],
          profiles: response.profiles
        }
      })
  }, []);
  const userProfiles = useAsyncState(StateProperty.userProfile, userProfileLoader);
  const patientsLoader = useCallback(async () => {
      let patients;
      if(userProfiles.data.currentProfile.profileType === 'patient') {
        patients = userProfiles.data.profiles
          .filter(curProfile => curProfile.profileType === 'patient')
          .map(curPatient => request(`patients/${curPatient.profileId}/profile`, 'GET'));
      }else if(userProfiles.data.currentProfile.profileType === 'prescriber') {
        let patientProfiles = await request(`prescribers/${userProfiles.data.currentProfile.profileId}/patients`, 'GET')
        patients = patientProfiles.patients.map(curPatient => request(`patients/${curPatient.patientId}/profile`, 'GET'))
      }else if(userProfiles.data.currentProfile.profileType === 'internal') {//TODO: adjust for paginated endpoint
        let patientProfiles = await request(`patients`, 'GET')
        patients = patientProfiles.profile.map(curPatient => request(`patients/${curPatient.id}/profile`, 'GET'))
      }

      return Promise.all(patients)
        .then(profiles => Promise.all(profiles.map(curProfile =>
            request(`patients/${curProfile.profile.id}/rxs`, 'GET')
              .then(results => {
                curProfile.profile.prescriptions = results.prescriptions;
                return curProfile.profile;
              })
          ))
        )
    },
    [userProfiles.data.profiles, userProfiles.data.currentProfile]);
  useAsyncState(StateProperty.patients, patientsLoader);

  return (
    <Container fluid className='h-100 main-container'>
      <Row className='h-100'>
        <Col xs={4} md={3} lg={2} className='py-5 shadow bg-light d-flex flex-column'>
          <LeftMenu />
        </Col>
        <Col xs={8} md={9} lg={10} className='py-5 pl-4'>
          <NavMenu />
          <Row className='mt-4 pr-2'>
            <Col className='mt-1'>
              <Main />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
