import React from 'react';
import { Row, Table } from "react-bootstrap";

function List({ data }) {
  return (
    <Row>
      <Table>
        <thead>
        <tr>
	  <th>Time</th>
          <th>Event</th>
          <th>Description</th>
        </tr>
        </thead>
        <tbody>
	  {
	      data.map((row, ix) => (
		      <tr key={ix}>
		      <td>{row.createdAt}</td>
		      <td>{row.data}</td>
		      <td>{row.description}</td>
		      </tr>
	      ))
	  }
        </tbody>
      </Table>
    </Row>
  )
}

export default List;
