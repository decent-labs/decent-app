import React, {useState} from "react";
import {Link, Redirect, Route, Switch, useRouteMatch} from "react-router-dom";
import New from "./new";

function Patients() {
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
          <Button>New Patient</Button>
        </Link>
      </Route>
      <Switch>
        <Route path={`${match.path}/new/:unknown`}>
          <Redirect to={`${match.path}/new`} />
        </Route>
        <Route path={`${match.path}/new`}>
          <New alert={setAlert} />
        </Route>
        <Route path={`${match.path}/:id`}>
          <Details alert={setAlert} />
        </Route>
        <Route path={`${match.path}/:unknown`}>
          <Redirect to={`${match.path}`} />
        </Route>
        <Route path={`${match.path}`}>
          <List />
        </Route>
      </Switch>
    </>
  );
}

export default Patients;