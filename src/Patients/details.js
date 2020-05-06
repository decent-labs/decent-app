import React, { useEffect } from 'react';
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {useParams, useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useAsyncState} from "../redux/actions/useAsyncState";
import {
  dataLoadingAction,
  dataAddAction,
  dataLoadingErrorAction
} from '../redux/reducers/async';
import {StateProperty} from "../redux/reducers";
import {request} from "../requests"

function Details() {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
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

  function getPrescriptionRecords() {
    return patientDetails.prescriptions.map((curPrescription, index) => {
      return (
        <tr key={index}>
          <td>{curPrescription.patientInfo.lastName}</td>
          <td>{curPrescription.patientInfo.firstName}</td>
          <td>{formatDate(curPrescription.patientInfo.dob)}</td>
          <td>{`${formatDate(curPrescription.dateWritten)} ${formatTime(curPrescription.dateWritten)}`}</td>
          <td>n/a</td>
          <td>n/a</td>
        </tr>
      );
    })
  }

  function formatDate(date){
    const dateObject = new Date(date);
    return `${dateObject.getMonth()}/${dateObject.getDay()}/${dateObject.getFullYear()}`;
  }

  function formatTime(date){
    const dateObject = new Date(date);
    return dateObject.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }

  return (
    <>
      <Row>
        <Col md={4} className='nameCard'>
          <h2>{`${patientDetails.firstName} ${patientDetails.lastName}`}</h2>
          <Row>
            <Col className='nameCard-header'>
              <p>
                DOB
              </p>
              <p>
                Phone
              </p>
              <p>
                SSN
              </p>
              <p>
                Address
              </p>
            </Col>
            <Col>
              <p>
                {formatDate(patientDetails.dob)}
              </p>
              <p>
                {patientDetails.phoneNumber || 'n/a'}
              </p>
              <p>
                {`***-**-${patientDetails.ssn.slice(-4)}`}
              </p>
              <address>
                {`${patientDetails.streetAddress} ${patientDetails.streetAddress2}
                ${patientDetails.city} ${patientDetails.state} ${patientDetails.zipCode}`}
              </address>
            </Col>
          </Row>
        </Col>
        <Container>
          <Row className='justify-content-end'>
            <Button>Record Results</Button>
          </Row>
        </Container>
      </Row>
      <hr />
      <Row>
        <Table>
          <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Date of Birth</th>
            <th>Date Tested</th>
            <th>Covid Test</th>
            <th>Date of Results</th>
          </tr>
          </thead>
          <tbody>
          {getPrescriptionRecords()}
          </tbody>
        </Table>
      </Row>
      <Row>
        <Col>
          <h5>Directions</h5>
          <p className='details-block'>n/a</p>
        </Col>
        <Col>
          <h5>Notes</h5>
          <p className='details-block'>n/a</p>
        </Col>
      </Row>
    </>
  )
}

export default Details;
