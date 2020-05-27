import React from "react";
import {Image, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {format} from 'date-fns';
import PatientDetailsIcon from '../assets/images/bmx-patient-details-icon.svg';

function ListTable({ labs }) {
  function getLatestPrescriptionDate(patient) {
      return 'n/a';
  }

  const rows = labs.map((lab, index) =>{
      return (
        <tr key={index}>
          <td>{lab.name}</td>
          <td className='action-items'>
            <Link to={`/labs/${lab.id}`}>
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
          <th>Lab Name</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
      </Table>
    </>
  )
}

export default ListTable;
