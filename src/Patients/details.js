import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
  Redirect,
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
import {getPrescriptionData} from "../Common/form";

function Details({alert}) {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  const match = useRouteMatch();
  const patients = useAsyncState(StateProperty.patients);
  const patientDetails = patients.data.patients.find(curPatient => curPatient.id === parseInt(id));

  useEffect(() => {
    if (patientDetails) return;

    dispatch(dataLoadingAction(StateProperty.patients));
    getPrescriptionData([request(`patients/${id}/profile`)])
      .then(response => {
        dispatch(dataAddAction(StateProperty.patients, response[0]))
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
        <Route path={`${match.path}/rxs/:rxhash`}>
          <PatientDetails patientDetails={patientDetails} />
        </Route>
        <Route path={`${match.path}/rxs/:rxhash/:unknown`}>
          <Redirect to={`${match.path}`}/>
        </Route>
        <Route path={`${match.path}`}>
          <PatientDetails patientDetails={patientDetails} />
        </Route>
      </Switch>
    </>
  )
}

export default Details;
