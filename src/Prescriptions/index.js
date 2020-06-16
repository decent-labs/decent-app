import React, {useState} from "react";
import {Alert, Button, Image} from "react-bootstrap";
import { Link, Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import New from "./new";
import Details from "./details";
import PersonPlus from "../assets/images/person-plus.svg";

function Prescriptions() {
  const match = useRouteMatch();
  const [alert, setAlert] = useState(null);

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

      <Route exact path={`${match.path}`}>
        <Link to={`${match.path}/new`} className='float-right'>
          <Button><Image src={PersonPlus}/> New Patient</Button>
        </Link>
      </Route>
      <Switch>
        <Route path={`${match.path}/new/:unknown`}>
          <Redirect to={`${match.path}/new`} />
        </Route>
        <Route path={`${match.path}/new`}>
          <New alert={autodismissingAlert} />
        </Route>
        <Route path={`${match.path}/:id`}>
          <Details alert={autodismissingAlert} />
        </Route>
        <Route path={`${match.path}/:unknown`}>
          <Redirect to={`${match.path}`} />
        </Route>
      </Switch>
    </>
  );
}

export default Prescriptions;
