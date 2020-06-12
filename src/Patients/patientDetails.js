import React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {format} from "date-fns";
import List from "../Prescriptions/list";
import {Link} from "react-router-dom";
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";

function PatientDetails({patientDetails}) {
  const profiles = useAsyncState(StateProperty.userProfile);

  function getPrescriptionsList() {
    if(patientDetails.prescriptions.length > 0)
      return <>
        <List patient={patientDetails} items={patientDetails.prescriptions} />
    </>
    return <div><h4>No prescriptions to display</h4></div>
  }
  return (
    <>
      <Row className='mx-0'>
        <Col md={4} className='nameCard'>
          <Row className='name'><h2>{`${patientDetails.firstName} ${patientDetails.lastName}`}</h2></Row>
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
                {format(new Date(patientDetails.dob), 'MM/dd/yyyy')}
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
        <Col className='mr-5'>
          {profiles.data.currentProfile.profileType === 'prescriber' &&
          <Row className='justify-content-end'>
            <Link to={`/patients/${patientDetails.id}/newPrescription`}><Button className='styled-form-button'>New Prescription</Button></Link>
          </Row>
          }
        </Col>
      </Row>
      <hr />
      {getPrescriptionsList()}
      <Row className='details'>
        <Col>
          <p className='ml-2'>Directions</p>
          <p className='details-block'>n/a</p>
        </Col>
        <Col>
          <p className='ml-2'>Notes</p>
          <p className='details-block'>n/a</p>
        </Col>
      </Row>
    </>
  )
}

export default PatientDetails;
