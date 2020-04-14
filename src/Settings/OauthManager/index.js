import React from 'react';

import Button from 'react-bootstrap/Button';
import { Switch, Route, Redirect, useRouteMatch, Link } from 'react-router-dom';

import List from './List';
import New from './New';

function OauthManager() {
  const match = useRouteMatch();

  return (
    <>
      <Route exact path={`${match.path}`}>
        <Link to={`${match.path}/new`} className='float-right'>
          <Button>New Application</Button>
        </Link>
      </Route>
      <Switch>
        <Route path={`${match.path}/new/:unknown`}>
          <Redirect to={`${match.path}/new`} />
        </Route>
        <Route path={`${match.path}/new`}>
          <New />
        </Route>
        
        <Route path={`${match.path}/:unknown`}>
          <Redirect to={`${match.path}`} />
        </Route>
        <Route path={match.path}>
          <List />
        </Route>
      </Switch>
    </>
  )
}

export default OauthManager;
