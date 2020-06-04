// imports
import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";

// other imports
import Settings from '../../Settings';
import Patients from '../../Patients';
import Physicians from '../../Physicians';
import Labs from '../../Labs';
import Prescriptions from '../../PrescriptionDetails';

function Main() {
  return (
    <Switch>
      <Route path='/settings'>
        <Settings />
      </Route>
      <Route name='patients' path='/patients'>
        <Patients />
      </Route>
      <Route path='/physicians'>
        <Physicians />
      </Route>
      <Route path='/labs'>
        <Labs />
      </Route>
      <Route path='/prescriptions'>
        <Prescriptions />
      </Route>
      <Route path='/:unknown'>
        <Redirect to='/' />
      </Route>
      <Redirect exact from='/' to='patients' />
    </Switch>
  );
}

export default Main;
