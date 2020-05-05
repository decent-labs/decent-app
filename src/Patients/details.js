import React from 'react';
import {
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch
} from 'react-router-dom';
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";
import PatientDetails from './patientDetails';
import NewPrescription from '../Prescriptions/new'

function Details({alert}) {
  let { id } = useParams();
  const match = useRouteMatch();
  const patients = useAsyncState(StateProperty.patients);

  if(patients.data.patients.length === 0){
    return <Redirect to='/patients' />
  }

  const patientDetails = patients.data.patients.find(curPatient => curPatient.id === parseInt(id));

  return (
    <>
      <Switch>
        <Route exact path={`${match.path}/newPrescription`}>
          <NewPrescription alert={alert}/>
        </Route>
        <Route path={`${match.path}`}>
          <PatientDetails patientDetails={patientDetails} />
        </Route>
      </Switch>
    </>
  )
}

export default Details;
