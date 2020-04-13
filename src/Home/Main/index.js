import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import Settings from '../../Settings';
import Welcome from '../../Welcome';

function Main() {
  return (
    <Switch>
      <Route path='/settings'>
        <Settings />
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
