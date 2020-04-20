import React, { useState } from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Switch, Route, Redirect, useRouteMatch, Link } from 'react-router-dom';

import List from './List';
import New from './New';

function OauthManager() {
  const match = useRouteMatch();
  const [alert, setAlert] = useState(null);

  return (
    <>
      {alert &&
        <Alert
          className='mt-3'
          variant={alert.variant}
          dismissible
          onClose={() => setAlert(null)}
        >
          {alert.message}
        </Alert>
      }

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
          <New alert={setAlert} />
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
