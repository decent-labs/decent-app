import React from 'react';
import { toast } from 'react-toastify';
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';

import Auth from './Auth';
import Home from './Home';
import PrivateRoute from './Routes/PrivateRoute';
import UnauthedRoute from './Routes/UnauthedRoute';
toast.configure();

function App() {
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
