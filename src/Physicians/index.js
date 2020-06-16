import React, {useState} from 'react';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  Link,
  useHistory
} from 'react-router-dom';

import Invite from './invite';
import List from './list';
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";

function Index() {
  const match = useRouteMatch();
  const history = useHistory();
  const userProfiles = useAsyncState(StateProperty.userProfile);
  const [alert, setAlert] = useState(null);

  const autodismissingAlert = info => {
    setAlert(info)
    setTimeout(() => setAlert(null), 5000)
  }

  if(userProfiles.data.currentProfile.profileType !== 'internal'){
    history.replace('/');
  }

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
        {userProfiles.data.currentProfile.admin &&
          <Link to={`${match.path}/invite`} className='float-right'>
            <Button className='styled-form-button'>Invite Physician</Button>
          </Link>
        }
      </Route>
      <Switch>
        {userProfiles.data.currentProfile.admin &&
          <Route path={`${match.path}/invite`}>
            <Invite alert={autodismissingAlert}/>
          </Route>
        }
        <Route path={`${match.path}`}>
          <List alert={autodismissingAlert} />
        </Route>
        <Route path={`${match.path}/:unknown`}>
          <Redirect to='/' />
        </Route>
      </Switch>
    </>
  );
}

export default Index;
