import React from 'react';
import { Button, Col, Row } from "react-bootstrap";
import { format } from "date-fns";
import List from "../Prescriptions/list";
import { Link } from "react-router-dom";
import { useAsyncState } from "../redux/actions/useAsyncState";
import { StateProperty } from "../redux/reducers";
import ProfilePhoto from "./profilePhoto"

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
      patientDetails.streetAddress.trim().length === 0 &&
      patientDetails.streetAddress2.trim().length === 0 &&
      patientDetails.city.trim().length === 0 &&
      patientDetails.state.trim().length === 0 &&
      patientDetails.zipCode.trim().length === 0
    ) return <address>n/a</address>

    return (
      <address>
        {patientDetails.streetAddress && <>{patientDetails.streetAddress}<br /></>}
        {patientDetails.streetAddress2 && <>{patientDetails.streetAddress2}<br /></>}
        {patientDetails.city && <>{patientDetails.city},</>} {patientDetails.state} {patientDetails.zipCode}
      </address>
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
                  <Col className="d-table-cell">{format(new Date(patientDetails.dob), 'MM/dd/yyyy')}</Col>
                </Row>
                <Row className="d-table-row">
                  <Col className='nameCard-header d-table-cell pb-1 pl-0' sm="auto">Phone</Col>
                  <Col className="d-table-cell">{patientDetails.phoneNumber || 'n/a'}</Col>
                </Row>
                <Row className="d-table-row">
                  <Col className='nameCard-header d-table-cell pb-1 pl-0' sm="auto">SSN</Col>
                  <Col className="d-table-cell">{`***-**-${patientDetails.ssn.slice(-4)}`}</Col>
                </Row>
                <Row className="d-table-row">
                  <Col className='nameCard-header d-table-cell pb-1 pl-0' sm="auto">Address</Col>
                  <Col className="d-table-cell">
                    <Address />
                  </Col>
                </Row>
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
