import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import Me from '../../Me';
import Welcome from '../../Welcome';

function Main() {
  return (
    <Switch>
      <Route path='/me'>
        <Me />
      </Route>
      <Route path='/:unknown'>
        <Redirect to='/' />
      </Route>
      <Route path='/'>
        <Welcome />
      </Route>
    </Switch>
  );
}

export default Main;
