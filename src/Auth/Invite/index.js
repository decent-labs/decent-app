import React, {useEffect, useState} from 'react';

import {Link, useParams} from 'react-router-dom';
import PhysicianInvite from './physicianInvite';
import LabInvite from "./labInvite";

import { request } from '../../requests';
import PatientInvite from "./patientInvite";
import InternalInvite from "./internalInvite";

function Invite({ alert }) {
  const { inviteCode } = useParams();

  const [valid, setValid] = useState(false);
  const [orgType, setOrgType] = useState('');

  useEffect(() => {
    request(`invitation/${inviteCode}`)
      .then(response => {
        setValid(!response.inviteInfo.confirmed);
        setOrgType(response.inviteInfo.orgType);
        if(!valid){
          alert({ message: 'Invalid Invite', variant: 'warning'})
        }
      })
      .catch(error => {
        setValid(false);
        alert({ message: 'Invalid Invite', variant: 'warning'})
      });
  }, [alert, inviteCode, valid])

  function validCode() {
    switch(orgType){
      case "lab":
        return <LabInvite alert={alert} />;
      case "hospital":
        return <PhysicianInvite alert={alert} />;
      case "internal":
        return <InternalInvite alert={alert} />;
      default:
        return <PatientInvite alert={alert} />;
    }
  }

  return (
    <>
      {valid && validCode()}
      <div className='text-center'>
        <Link to='/auth/login'>Login</Link>
      </div>
    </>
  );
}

export default Invite;
