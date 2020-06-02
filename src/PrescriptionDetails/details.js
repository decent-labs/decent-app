import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { Button, Col, Row} from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';
import moment from 'moment';
import List from './list';
import {
  useHistory,
  useParams,
} from 'react-router-dom';
import {useAsyncState} from "../redux/actions/useAsyncState";
import {
  dataLoadingAction,
  dataAddAction,
  dataLoadingErrorAction
} from '../redux/reducers/async';
import {StateProperty} from "../redux/reducers";
import {request} from "../requests"

function Details({alert}) {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  const state = useAsyncState(StateProperty.prescription);
  let rxDetails = state.data.currentPrescription;

  const addPrescriptionData = data => {
      request(`rxs/${rxDetails.hash}/addOn`, 'POST', {data: { ...data, type: "testResult"}})
      .then(response => {
	  request(`rxs/${id}`)
	      .then(response => {
		  dispatch(dataAddAction(StateProperty.prescription, { currentPrescription: response.prescriptionInfo }))
	      })
      })
  }

  const savePositiveResult = () => {
      return addPrescriptionData({
	  covidTestResult: "positive",
      });
  };

  const saveNegativeResult = () => {
      return addPrescriptionData({
	  covidTestResult: "negative",
      });
  };

  let testStatus = "pending";

  useEffect(() => {
    dispatch(dataLoadingAction(StateProperty.prescription));
    request(`rxs/${id}`)
      .then(response => {
          dispatch(dataAddAction(StateProperty.prescription, { currentPrescription: response.prescriptionInfo }))
      })
      .catch(error => {
        dispatch(dataLoadingErrorAction(StateProperty.prescription, error));
      });
  }, [dispatch, id, history, state.data.currentPrescription.hash])

  const data = [
      {
	  createdAt: rxDetails.writtenDate,
	  description: "COVID-19 Screening Kit Ordered"
      },
      ...(rxDetails.data || [])
  ];

  if (rxDetails && rxDetails.data) {
      for( var row of rxDetails.data) {
	  const rowData = JSON.parse(row.data);
	  if (rowData && rowData.covidTestResult) {
	      switch (rowData.covidTestResult) {
	      case "positive":
		  testStatus = "positive";
		  break;
	      case "negative":
		  testStatus = "negative";
		  break;
              default:
	        testStatus = "pending";
	      }

	  }
      }
  }

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
	  <Badge pill variant="info">{ testStatus }</Badge>
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
       <Button onClick={savePositiveResult}>Covid Positive</Button>
       </Col>
       <Col>
       <Button onClick={saveNegativeResult}>Covid Negative</Button>
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
