import React from 'react';
import {Col, Container, Row, Table} from "react-bootstrap";
import {format} from "date-fns";

const Print = React.forwardRef((props, ref) => {
  const {patient, prescription} = props;

  function getLastTestedDate(prescription) {
    if(prescription.data.length > 0)
      return format(new Date(prescription.data[prescription.data.length-1].createdAt), 'MM/dd/yyyy');
    return 'n/a';
  }

  function getTestResult(prescription) {
    if(prescription.data.length > 0){
      const results = JSON.parse(prescription.data[prescription.data.length-1].data).covidTestResult;

      if(results === 'positive')
        return <td className='positive last-row-element'>{results}</td>
      return <td className='negative last-row-element'>{results}</td>
    }
    return <td>n/a</td>;

  }

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
          Social Security Number
        </p>
        <p>
          Address
        </p>
      </Col>
      <Col className='col-print-2'>
        <p> {patient.firstName} {patient.lastName}</p>
        <p>
          {new Date(patient.dob).toLocaleDateString(undefined, { timeZone: 'UTC' })}
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
        </tr>
        </thead>
        <tbody>
        <tr>
          <td className='first-row-element'>{patient.lastName}</td>
          <td>{patient.firstName}</td>
          <td>{new Date(patient.dob).toLocaleDateString(undefined, { timeZone: 'UTC' })}</td>
          <td>{getLastTestedDate(prescription)}</td>
          {getTestResult(prescription)}
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
