import React from 'react';
import { Button, Col, Row } from "react-bootstrap";
import { format } from "date-fns";
import List from "../Prescriptions/list";
import { Link } from "react-router-dom";
import { useAsyncState } from "../redux/actions/useAsyncState";
import { StateProperty } from "../redux/reducers";

function PatientDetails({ patientDetails }) {
  const profiles = useAsyncState(StateProperty.userProfile);

  function getPrescriptionsList() {
    if (patientDetails.prescriptions.length > 0)
      return <>
        <List patient={patientDetails} items={patientDetails.prescriptions} />
      </>
    return <div><h4>No prescriptions to display</h4></div>
  }
  return (
    <>
      <Row>
        <Col md={4}>
          <div className='nameCard'>


            <Row>
              <Col>
                <h2>{`${patientDetails.firstName} ${patientDetails.lastName}`}</h2>
              </Col>
            </Row>

            <Row className="mb-1">
              <Col className='nameCard-header'>DOB</Col>
              <Col>{format(new Date(patientDetails.dob), 'MM/dd/yyyy')}</Col>
            </Row>
            <Row className="mb-1">
              <Col className='nameCard-header'>Phone</Col>
              <Col>{patientDetails.phoneNumber || 'n/a'}</Col>
            </Row>
            <Row className="mb-1">
              <Col className='nameCard-header'>SSN</Col>
              <Col>{`***-**-${patientDetails.ssn.slice(-4)}`}</Col>
            </Row>
            <Row className="mb-1">
              <Col className='nameCard-header'>Address</Col>
              <Col>
                <address>
                  {`${patientDetails.streetAddress} ${patientDetails.streetAddress2}
                ${patientDetails.city} ${patientDetails.state} ${patientDetails.zipCode}`}
                </address>
              </Col>
            </Row>
          </div>
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
      <Row>
        <Col>
          {getPrescriptionsList()}
        </Col>
      </Row>

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
