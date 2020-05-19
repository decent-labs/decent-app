import React from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {format} from "date-fns";
import List from "../Prescriptions/list";
import {Link} from "react-router-dom";

function PatientDetails({patientDetails}) {

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
        <Container>
          <Row className='justify-content-end'>
            <Link to={`/patients/${patientDetails.id}/newPrescription`}><Button>Record Results</Button></Link>
          </Row>
        </Container>
      </Row>
      <hr />
      <List patient={patientDetails} items={patientDetails.prescriptions} />
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

export default PatientDetails;
