import React from "react";
import {Image, Table} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import PatientDetailsIcon from '../assets/images/bmx-patient-details-icon.svg';

export default function ListTable({ labs }) {
  const history = useHistory();
  const rows = labs.map((lab, index) =>{
      return (
        <tr key={index} className='clickable' onClick={() => history.push(`/labs/${lab.id}`)}>
          <td className='first-row-element'>{lab.name}</td>
          <td className='action-items last-row-element'>
            <div>
              <Link onClick={event => event.stopPropagation()} to={`/labs/${lab.id}`}>
                <div className="icon">
                  <Image src={PatientDetailsIcon} />
                </div>
              </Link>
            </div>
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


