import React from 'react';
import {Col, Container, Row, Table} from "react-bootstrap";
import {format} from "date-fns";

const Print = React.forwardRef((props, ref) => {
  const {patient, prescription} = props;
  return <Container className='print-view' ref={ref}>
    <Row className='rx-header'><h1>RX</h1></Row>
    <Row>
      <Col className='nameCard-header col-print-1'  >
        <p>Patient</p>
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
      <Col className='col-print-2'>
        <p> {patient.firstName} {patient.lastName}</p>
        <p>
          {format(new Date(patient.dob), 'MM/dd/yyyy')}
        </p>
        <p>
          {patient.phoneNumber || 'n/a'}
        </p>
        <p>
          {`***-**-${patient.ssn.slice(-4)}`}
        </p>
        <address>
          {`${patient.streetAddress} ${patient.streetAddress2}
              ${patient.city} ${patient.state} ${patient.zipCode}`}
        </address>
      </Col>
      <Col className='nameCard-header col-print-1'>
        <p>
          Allergies
        </p>
        <p>
          Weight
        </p>
      </Col>
      <Col className='col-print-2'>
        <p>
          {patient.allergies.length > 0 ? patient.allergies.map(curAllergy => `${curAllergy} `) : 'none'}
        </p>
        <p>
          Weight
        </p>
      </Col>
    </Row>
    <hr/>
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
        <tr>
          <td>{patient.lastName}</td>
          <td>{patient.firstName}</td>
          <td>{format(new Date(patient.dob), 'MM/dd/yyyy')}</td>
          <td>n/a</td>
          <td>n/a</td>
          <td>n/a</td>
        </tr>
        </tbody>
      </Table>
    </Row>
    <Row>
      <Col>
        <h5>Directions</h5>
        <p className='details-block'>{prescription.directions}</p>
      </Col>
      <Col>
        <h5>Notes</h5>
        <p className='details-block'>{prescription.notes}</p>
      </Col>
    </Row>
  </Container>
})

export default Print;
