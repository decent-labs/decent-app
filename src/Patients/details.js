import React, { useEffect } from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch
} from 'react-router-dom';
import {useAsyncState} from "../redux/actions/useAsyncState";
import {
  dataLoadingAction,
  dataAddAction,
  dataLoadingErrorAction
} from '../redux/reducers/async';
import {StateProperty} from "../redux/reducers";
import PatientDetails from './patientDetails';
import NewPrescription from '../Prescriptions/new'
import {request} from "../requests"

function Details({alert}) {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  const match = useRouteMatch();
  const patients = useAsyncState(StateProperty.patients);
  const patientDetails = patients.data.find(curPatient => curPatient.id === parseInt(id));

  useEffect(() => {
    if (patientDetails) return;

    dispatch(dataLoadingAction(StateProperty.patients));
    request(`patients/${id}/profile`)
      .then(response => {
        dispatch(dataAddAction(StateProperty.patients, { ...response.profile, prescriptions: [] }))
      })
      .catch(error => {
        dispatch(dataLoadingErrorAction(StateProperty.patients, error));
        history.replace('..')
      });
  }, [dispatch, id, patientDetails, history])

  if (!patientDetails) return <></>

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
