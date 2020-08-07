import React from "react";
import { Table } from "react-bootstrap";

function ListTable(params) {

  const users = params.users;


  if (! users )
    return <><p> No Lab Technicians</p></>

  const rows = users.map((technician, index) =>{
      return (
        <tr key={index}>
          <td className='first-row-element'>{technician.fullName}</td>
        </tr>
      )
    }
  )

  return(
    <>
      <Table>
        <thead>
        <tr>
          <th>Technician Name</th>
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
