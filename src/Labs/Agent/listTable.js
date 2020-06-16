import React from "react";
import { Table } from "react-bootstrap";

function ListTable(params) {

  const users = params.users;


  if (! users )
    return <><p> No Lab Agents</p></>

  const rows = users.map((agent, index) =>{
      return (
        <tr key={index}>
          <td className='first-row-element'>{agent.fullName}</td>
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
