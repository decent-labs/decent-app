import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { Button, Container, Col,Nav, Row} from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';
import {format} from 'date-fns';
import moment from 'moment';
import Sidebar from '../Sidebar';
import List from './list';
import {
  Route,
  Switch,
  useHistory,
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
import NewPrescription from '../Prescriptions/new'
import {request} from "../requests"

function Details({alert}) {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  const state = useAsyncState(StateProperty.prescription);
  let rxDetails = state.data.currentPrescription
  useEffect(() => {
    if(state.data.currentPrescription.hash) return;
    dispatch(dataLoadingAction(StateProperty.prescription));
    request(`rxs/${id}`)
      .then(response => {
          dispatch(dataAddAction(StateProperty.prescription, { currentPrescription: response.prescriptionInfo }))
      })
      .catch(error => {
        dispatch(dataLoadingErrorAction(StateProperty.prescription, error));
      });
  }, [dispatch, id, history])

  const data = [
      {
	  createdAt: rxDetails.writtenDate,
	  description: "COVID-19 Screening Kit Ordered"
      },
      ...(rxDetails.data || [])
  ];

  return (<>
	  <Row>
        <Col md={4} className='nameCard'>
          <h2>Covid Screen: {`${rxDetails.hash}`}</h2>
          <Row>
            <Col className='nameCard-header'>
              <p>
                Status
              </p>
              <p>
                Written On
              </p>
            </Col>
            <Col>
          <p>
	  <Badge pill variant="info">Pending</Badge>
          </p>
          <p>
	  {  moment(rxDetails.writtenDate).toString() }
          </p>
            </Col>
          </Row>
        </Col>
       <Col md={4}/>
       <Col md={4} className='nameCard'>
       <Row>
       <Col>
       <Button>Covid Positive</Button>
       </Col>
       <Col>
       <Button>Covid Negative</Button>
       </Col>
       </Row>
       </Col>
    </Row>
    <Row>
    <List data={data || []}/>
    </Row>
</>
  )
}

export default Details;
