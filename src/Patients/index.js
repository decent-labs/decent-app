import React, {useState} from "react";
import {Link, Redirect, Route, Switch, useRouteMatch} from "react-router-dom";
import New from "./new";
import List from "./list";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Details from "./details";
import SearchResults from "./searchResults";
import PersonPlus from "../assets/images/person-plus.svg";
import {Image} from "react-bootstrap";
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";

function Patients() {
  const match = useRouteMatch();
  const [alert, setAlert] = useState(null);
  const userProfiles = useAsyncState(StateProperty.userProfile);

  const autodismissingAlert = info => {
    setAlert(info)
    setTimeout(() => setAlert(null), 5000)
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

      {['prescriber', 'patient'].includes(userProfiles.data.currentProfile.profileType) &&
        <Route exact path={`${match.path}`}>
          <Link to={`${match.path}/new`} className='float-right'>
            <Button className='styled-form-button'><Image src={PersonPlus}/> New Patient</Button>
          </Link>
        </Route>
      }
      <Switch>
        <Route path={`${match.path}/new/:unknown`}>
          <Redirect to={`${match.path}/new`} />
        </Route>
        <Route path={`${match.path}/new`}>
          <New alert={autodismissingAlert} />
        </Route>
        <Route path={`${match.path}/search/:unknown`}>
          <Redirect to={`${match.path}`} />
        </Route>
        <Route path={`${match.path}/search`}>
          <SearchResults alert={autodismissingAlert} />
        </Route>
        <Route path={`${match.path}/:id`}>
          <Details alert={autodismissingAlert} />
        </Route>
        <Route path={`${match.path}`}>
          <List/>
        </Route>
      </Switch>
    </>
  );
}

export default Patients;
