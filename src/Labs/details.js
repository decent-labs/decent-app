import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {
  Link,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch
} from 'react-router-dom';
import {useAsyncState} from "../redux/actions/useAsyncState";
import {
  dataLoadingAction,
  dataLoadingErrorAction,
  dataUpdateAction
} from '../redux/reducers/async';
import {StateProperty} from "../redux/reducers";
import LabDetails from '../Labs/labDetails';
import NewPrescription from '../Prescriptions/new'
import {request} from "../requests"
import Button from "react-bootstrap/Button";

function Details({alert}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const match = useRouteMatch();
  const state = useAsyncState(StateProperty.labs);
  const userProfiles = useAsyncState(StateProperty.userProfile);
  const labDetails = state.data.labs &&
	state.data.labs.data.find &&
	state.data.labs.data.find($lab => $lab.id === parseInt(id));
  useEffect(() => {
    if (labDetails && labDetails.users) return;
    dispatch(dataLoadingAction(StateProperty.labs));
      request(`labOrgs/${id}/profile`, 'GET')
      .then(response => {
	  request(`labOrgs/${id}/users`, 'GET')
	      .then(usersResponse => {
		  const labProfile = {
		      ...response.profile,
		      users: [...usersResponse.users.admins, ...usersResponse.users.nonAdmins]
		  };
		  dispatch(dataUpdateAction(StateProperty.labs, {
		      currentLab: response.profile,
		      agents: [],
		      labs: { ...state.data.labs, data: [ labProfile , ...state.data.labs.data || []] },
		  }))
	      })

      })
      .catch(error => {
        dispatch(dataLoadingErrorAction(StateProperty.labs, error));
        history.replace('..')
      });
  }, [dispatch, id, labDetails, history, state.data.labs])

  if (!labDetails) return <></>

  return (
    <>
      <Route exact path={`${match.path}`}>
        {userProfiles.data.currentProfile.admin &&
        <Link to={`${match.url}/invite`} className='float-right'>
          <Button>New Agent</Button>
        </Link>
        }
      </Route>
      <Switch>
        <Route exact path={`${match.path}/newPrescription`}>
          <NewPrescription alert={alert}/>
        </Route>
        <Route path={`${match.path}`}>
          <LabDetails labDetails={labDetails} />
        </Route>
      </Switch>
    </>
  )
}

export default Details;
