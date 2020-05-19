import React, {useRef} from 'react';
import {format} from "date-fns";
import {Image, Row, Table} from "react-bootstrap";
import PrintIcon from '../assets/images/print-button-svgrepo-com.svg';
import Print from './print';
import {useReactToPrint} from "react-to-print";

function List({ patient, items }) {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true
  });

  function getPrescriptions() {
    return items.map((curPrescription, index) => {
      return (
        <tr key={index}>
          <td>{curPrescription.patientInfo.lastName}</td>
          <td>{curPrescription.patientInfo.firstName}</td>
          <td>{format(new Date(curPrescription.patientInfo.dob), 'MM/dd/yyyy')}</td>
          <td>n/a</td>
          <td>n/a</td>
          <td>n/a</td>
          <td className='action-items'>
            <div style={{ display: "none" }}><Print patient={patient} prescription={curPrescription} ref={componentRef} /></div>
            <div onClick={handlePrint}>
              <Image src={PrintIcon} />
            </div>
          </td>
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
          <th>Actions</th>
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
