import React from "react";
import {Redirect, Route, Switch, useRouteMatch} from "react-router-dom";
import {Col, Row} from "react-bootstrap"
import NewPatient from "./newPatient";
import List from "./list";

function Patients() {
  const match = useRouteMatch();
  return (
    <Row className='mt-4'>
      <Col>
        <Switch>
          <Route path={`${match.path}/newPatient/:unknown`}>
            <Redirect to={`${match.path}/`} />
          </Route>
          <Route path={`${match.path}/newPatient`}>
            <NewPatient />
          </Route>
          <Route path={`${match.path}/:unknown`}>
            <Redirect to={`${match.path}/`} />
          </Route>
          <Route path={`${match.path}/`}>
            <List />
          </Route>
        </Switch>
      </Col>
    </Row>
  );
}

export default Patients;
