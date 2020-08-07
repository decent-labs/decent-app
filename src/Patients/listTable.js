import React from "react";
import { Image, Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { format } from 'date-fns';
import PatientDetailsIcon from '../assets/images/bmx-patient-details-icon.svg';
import ProfilePhoto from "./profilePhoto"

function ListTable({ patients }) {
  const history = useHistory();
  function getLatestPrescriptionDate(patient) {
    if (!!patient.prescriptions === false || patient.prescriptions.length === 0) {
      return 'n/a';
    }
    var mostRecentDate = new Date(Math.max.apply(null, patient.prescriptions.map(e => {
      return new Date(e.writtenDate);
    })));
    return format(mostRecentDate, 'MM/dd/yyyy');
  }

  const patientRows = patients.map((patient, index) => {
    return (
      <tr className='clickable' key={index} onClick={() => history.push(`/patients/${patient.id}`)}>
        <td className='first-row-element w-1 py-0'>
          <ProfilePhoto
            firstName={patient.firstName}
            lastName={patient.lastName}
            userId={patient.userId}
            entityId={patient.id}
            size="36"
          />
        </td>
        <td>{patient.lastName}</td>
        <td>{patient.firstName}</td>
        <td>{new Date(patient.dob).toLocaleDateString(undefined, { timeZone: 'UTC' })}</td>
        <td>{getLatestPrescriptionDate(patient)}</td>
        <td className='action-items last-row-element'>
          <div>
            <Link to={`/patients/${patient.id}`}>
              <div className="icon">
                <Image src={PatientDetailsIcon} />
              </div>
            </Link>
          </div>
        </td>
      </tr>
    )
  })

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Date of Birth</th>
            <th>Last Rx Date</th>
            <th>Details</th>
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
