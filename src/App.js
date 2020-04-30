import React, {useCallback} from 'react';

import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';

import Auth from './Auth';
import Home from './Home';
import PrivateRoute from './Routes/PrivateRoute';
import UnauthedRoute from './Routes/UnauthedRoute';
import {request} from "./requests";
import {useAsyncState} from "./redux/actions/useAsyncState";
import {StateProperty} from "./redux/reducers";

function App() {
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
  useAsyncState(StateProperty.userProfile, userProfileLoader);

  return (
    <Router>
      <Switch>
        <UnauthedRoute path='/auth'>
          <Auth />
        </UnauthedRoute>
        <PrivateRoute path='/'>
          <Home />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
