import React from 'react';
import Helmet from 'react-helmet';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';

import { NAME } from './config';

import Nav from './components/Nav';
import Home from './pages/Home';
import Examples from './pages/Examples';
import NotFound from './pages/NotFound';
import {
  HOME_ROUTE,
  EXAMPLES_ROUTE
} from './routes';

const App = () => (
  <div>
    <Helmet titleTemplate={ `%s | ${NAME}` } defaultTitle={ NAME } />
    <Nav />
    <Switch>
      <Route exact path={ HOME_ROUTE } render={ () => ( <Home /> ) } />
      <Route path={ EXAMPLES_ROUTE } render={ () => ( <Examples /> ) } />
      <Route component={ NotFound } />
    </Switch>
  </div>
);

export default App;