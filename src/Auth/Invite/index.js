import React, {useEffect, useState} from 'react';

import Col from 'react-bootstrap/Col';
import {Link, useParams} from 'react-router-dom';
import PhysicianInvite from './physicianInvite';
import LabInvite from "./labInvite";

import { request } from '../../requests';
import PatientInvite from "./patientInvite";

function Invite({ alert }) {
  const { inviteCode } = useParams();

  const [valid, setValid] = useState(false);
  const [orgType, setOrgType] = useState('');

  useEffect(() => {
    request(`invitation/${inviteCode}`)
      .then(response => {
        setValid(!response.inviteInfo.confirmed);
        setOrgType(response.inviteInfo.orgType);
      })
      .catch(error => {
        setValid(false);
        alert({ message: 'Invalid Invite', variant: 'warning'})
      });
  }, [alert, inviteCode])

  function validCode() {
    switch(orgType){
      case "lab":
        return <LabInvite alert={alert} />;
      case "hospital":
        return <PhysicianInvite alert={alert} />;
      default:
        return <PatientInvite alert={alert} />;
    }
  }

  return (
    <Col>
      {valid && validCode()}
      <div className='text-center'>
        <Link to='/auth/login'>Back to Login</Link>
      </div>
    </Col>
  );
}

export default Invite;
