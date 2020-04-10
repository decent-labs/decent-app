import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Me from '../../Me';
import Welcome from '../../Welcome';

function Main() {
  return (
    <Switch>
      <Route path='/me'>
        <Me />
      </Route>
      <Route path='/'>
        <Welcome />
      </Route>
    </Switch>
  );
}

export default Main;
