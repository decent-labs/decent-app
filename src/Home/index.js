import React, {useCallback, useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import LeftMenu from './LeftMenu';
import NavMenu from './NavMenu';
import Main from './Main';

import { request } from "../requests";
import { useAsyncState } from "../redux/actions/useAsyncState";
import { StateProperty } from "../redux/reducers";
import {fetchUserProfiles} from "../redux/reducers/async/userProfile";
import { AccountPrefixes } from "./text";
import isEmpty from 'lodash.isempty';

import {dataSetAction} from "../redux/reducers/async";
import {useDispatch} from "react-redux";
import Alert from "react-bootstrap/Alert";
function Home() {
  const requestError = useAsyncState(StateProperty.requestError);
  const [alert, setAlert] = useState(null);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(requestError.data.message !== '')
      setAlert({message:requestError.data.message, variant: 'danger'});
    else
      setAlert(null);
  },[requestError.data.message])

  const accountLoader = useCallback(() => request('auth/me', 'GET')
    .catch(error => {
      if(error.startsWith('Failed to fetch')){
        dispatch(dataSetAction(StateProperty.requestError, {message: 'Error messaging server, please refresh and try again'}))
        setTimeout(() => dispatch(dataSetAction(StateProperty.requestError, {message: ''})), 5000)
      }
  }), [dispatch]);

  useAsyncState(StateProperty.account, accountLoader);
  const userProfileLoader = useCallback(() => {
    const addPrefixLabels = (list) => {
	    return list.map( profile => {
	      let label;
        let entityName = !isEmpty(profile.entityName)
		       ? profile.entityName
		       : profile.profileType

	      label = AccountPrefixes[profile.profileType];
	      if (label) {
		      entityName = `${label} ${entityName}`;
	      }
	      return {
		      ...profile,
		      entityName
	      }
	    })
    }
    return fetchUserProfiles()
      .then((response) => {
        const profiles = addPrefixLabels(response.profiles)
        return {
          currentProfile: profiles[0],
          profiles
        }
      })
  }, []);
  useAsyncState(StateProperty.userProfile, userProfileLoader);

  return (
    <Container fluid className='h-100 main-container'>
      <Row className='h-100'>
        <Col xs={4} md={3} lg={2} className='py-5 shadow bg-light d-flex flex-column'>
          <LeftMenu />
        </Col>
        <Col xs={8} md={9} lg={10} className='py-5 pl-4'>
          <Row className='mx-5 mt-3'>
            {alert && <Col>
              <Alert
                variant={alert.variant}
                dismissible
                onClose={() => setAlert(null)}
              >
                {alert.message}
              </Alert>
            </Col>
            }
          </Row>
          <NavMenu />
          <Row className='mt-4 pr-2'>
            <Col className='mt-1 px-4'>
              <Main />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
