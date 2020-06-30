// imports
import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";

// other imports
import Settings from '../../Settings';
import Patients from '../../Patients';
import Physicians from '../../Physicians';
import Labs from '../../Labs';

function Main() {
  return (
    <Switch>
      <Route path='/settings'>
        <Settings />
      </Route>
      <Route path='/patients'>
        <Patients />
      </Route>
      <Route path='/physicians'>
        <Physicians />
      </Route>
      <Route path='/labs'>
        <Labs />
      </Route>
      <Route path='/:unknown'>
        <Redirect to='/' />
      </Route>
      <Redirect from='/' to='patients' />
    </Switch>
  );
}

export default Main;
