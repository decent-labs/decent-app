import React from 'react';
import { Button, Col, Row } from "react-bootstrap";
import List from "../Prescriptions/list";
import { Link } from "react-router-dom";
import { useAsyncState } from "../redux/actions/useAsyncState";
import { StateProperty } from "../redux/reducers";
import ProfilePhoto from "./profilePhoto"
import isEmpty from 'lodash.isempty';

function PatientDetails({ patientDetails }) {
  const profiles = useAsyncState(StateProperty.userProfile);

  function getPrescriptionsList() {
    if (patientDetails.prescriptions.length > 0)
      return <>
        <List patient={patientDetails} items={patientDetails.prescriptions} />
      </>
    return <div><h4>No prescriptions to display</h4></div>
  }

  const Address = () => {
    if (
      isEmpty(patientDetails.streetAddress)  && 
      isEmpty(patientDetails.streetAddress2) &&
      isEmpty(patientDetails.city)           &&
      isEmpty(patientDetails.state)          &&
      isEmpty(patientDetails.zipCode)
    ) return null;

    return (

      <Row className="d-table-row">
        <Col className='nameCard-header d-table-cell pb-1 pl-0' sm="auto">Address</Col>
        <Col className="d-table-cell">
          <address>
            {patientDetails.streetAddress && <>{patientDetails.streetAddress}<br /></>}
            {patientDetails.streetAddress2 && <>{patientDetails.streetAddress2}<br /></>}
            {patientDetails.city && <>{patientDetails.city},</>} {patientDetails.state} {patientDetails.zipCode}
          </address>
        </Col>
      </Row>
    )
  }

  return (
    <>
      <Row>
        <Col md="auto">
          <div className='nameCard'>
            <Row>
              <Col>
                <h2>{`${patientDetails.firstName} ${patientDetails.lastName}`}</h2>
              </Col>
            </Row>
            <Row>
              <Col sm="auto">
                <div className="shadow">
                  <ProfilePhoto
                    firstName={patientDetails.firstName}
                    lastName={patientDetails.lastName}
                    userId={patientDetails.userId}
                    entityId={patientDetails.id}
                    size="150"
                  />
                </div>
              </Col>
              <Col>
                <Row className="d-table-row">
                  <Col className='nameCard-header d-table-cell pb-1 pl-0' sm="auto">DOB</Col>
                  <Col className="d-table-cell">{new Date(patientDetails.dob).toLocaleDateString(undefined, { timeZone: 'UTC' })}</Col>
                </Row>
                <Row className="d-table-row">
                  <Col className='nameCard-header d-table-cell pb-1 pl-0' sm="auto">Phone</Col>
                  <Col className="d-table-cell">{patientDetails.phoneNumber || 'n/a'}</Col>
                </Row>
                <Row className="d-table-row">
                  <Col className='nameCard-header d-table-cell pb-1 pl-0' sm="auto">SSN</Col>
                  <Col className="d-table-cell">{`***-**-${patientDetails.ssn.slice(-4)}`}</Col>
                </Row>
                <Address />
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
      {profiles.data.currentProfile.profileType === 'prescriber' && patientDetails.prescriptions.length === 0 &&
        <Row className='mt-4 justify-content-center'>
          <p>
            New patient has no history. <Link to={`/patients/${patientDetails.id}/newPrescription`}>Prescribe test kit</Link>
          </p>
        </Row>
      }
    </>
  )
}

export default PatientDetails;
