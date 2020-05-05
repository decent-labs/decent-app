import React from 'react';
import {format} from "date-fns";
import {Row, Table} from "react-bootstrap";

function List({ items }) {
  function getPrescriptions() {
    return items.map((curPrescription, index) => {
      return (
        <tr key={index}>
          <td>{curPrescription.patientInfo.lastName}</td>
          <td>{curPrescription.patientInfo.firstName}</td>
          <td>{format(new Date(curPrescription.patientInfo.dob), 'MM/dd/yyyy')}</td>
          <td>{format(new Date(curPrescription.writtenDate), 'MM/dd/yyyy hh:mm aa')}</td>
          <td>n/a</td>
          <td>n/a</td>
        </tr>
      );
    })
  }
  return (
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
        {getPrescriptions()}
        </tbody>
      </Table>
    </Row>
  )
}

export default List;
