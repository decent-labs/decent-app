import React from "react";
import {Image, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {format} from 'date-fns';
import PatientDetailsIcon from '../assets/images/bmx-patient-details-icon.svg';

function ListTable({patients}) {
  function getLatestPrescriptionDate(patient) {
    if(!!patient.prescriptions === false || patient.prescriptions.length === 0){
      return 'n/a';
    }
    var mostRecentDate = new Date(Math.max.apply(null, patient.prescriptions.map( e => {
      return new Date(e.writtenDate);
    })));
    return format(mostRecentDate, 'MM/dd/yyyy');
  }

  const patientRows = patients.map((patient, index) =>{
      return (
        <tr key={index}>
          <td>{patient.lastName}</td>
          <td>{patient.firstName}</td>
          <td>{format(new Date(patient.dob),'MM/dd/yyyy')}</td>
          <td>{getLatestPrescriptionDate(patient)}</td>
          <td className='action-items'>
            <Link to={`/patients/${patient.id}`}>
              <div>
                <Image src={PatientDetailsIcon} />
              </div>
            </Link>
          </td>
        </tr>
      )
    }
  )

  return(
    <>
      <Table>
        <thead>
        <tr>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Date of Birth</th>
          <th>Last Rx Date</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {patientRows}
        </tbody>
      </Table>
    </>
  )
}

export default ListTable;
