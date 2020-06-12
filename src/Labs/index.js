import React, {useState} from "react";
import {Link, Redirect, Route, Switch, useRouteMatch} from "react-router-dom";
import New from "./new";
import List from "./list";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Details from "./details";
import Invite from "./invite";
import Edit from "./edit";
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";

export default function Labs() {
  const match = useRouteMatch();
  const userProfiles = useAsyncState(StateProperty.userProfile);
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
        {userProfiles.data.currentProfile.admin &&
          <Link to={`${match.path}/new`} className='float-right'>
            <Button className='styled-form-button'>New Lab</Button>
          </Link>
        }
      </Route>
      <Switch>
        {userProfiles.data.currentProfile.admin &&
          <Route path={`${match.path}/:labOrgId/invite`}>
            <Invite alert={setAlert}/>
          </Route>
        }
        <Route path={`${match.path}/newAgent/:unknown`}>
          <Redirect to={`${match.path}/newAgent`} />
        </Route>
        <Route path={`${match.path}/newAgent`}>
          <New alert={setAlert} />
        </Route>
        {userProfiles.data.currentProfile.admin &&
          <Route path={`${match.path}/new/:unknown`}>
            <Redirect to={`${match.path}/new`}/>
          </Route>
        }
        {userProfiles.data.currentProfile.admin &&
          <Route path={`${match.path}/new`}>
            <New alert={setAlert} />
          </Route>
        }
        <Route path={`${match.path}/:id/edit`}>
          <Edit alert={setAlert} />
        </Route>
        <Route path={`${match.path}/:id`}>
          <Details alert={setAlert} />
        </Route>
        <Route path={`${match.path}`}>
          <List/>
        </Route>
      </Switch>
    </>
  );
}
