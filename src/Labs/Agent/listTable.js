import React from "react";
import {Image, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import PatientDetailsIcon from '../../assets/images/bmx-patient-details-icon.svg';

function ListTable(params) {

  const users = params.users;


  if (! users )
    return <><p> No Lab Agents</p></>

  const rows = users.map((agent, index) =>{
      return (
        <tr key={index}>
          <td>{agent.fullName}</td>
          <td className='action-items'>
            <Link to={`/labs/agents/${agent.id}`}>
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
          <th>Agent Name</th>
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
