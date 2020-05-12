import React, {useCallback, useState} from "react";
import {Col, Pagination, Row, Table} from "react-bootstrap";
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";
import {request} from "../requests";
import {format} from "date-fns";

function List() {
  const [currentPage, setCurrentPage] = useState(1);
  const userProfiles = useAsyncState(StateProperty.userProfile);
  const physiciansLoader = useCallback(async () => {
      return request(`prescribers?currentPage=${currentPage}`, 'GET')
        .then(results => results.prescribers.data);
    },
    [currentPage]);
  const physicians = useAsyncState(StateProperty.physicians, physiciansLoader);

  function getPhysicianList() {
    return physicians.data.map((curPhysician, index) => {
      return <tr key={index}>
        <td>{curPhysician.lastName}</td>
        <td>{curPhysician.firstName}</td>
        <td>{curPhysician.email}</td>
        <td>{format(new Date(curPhysician.dob),'MM/dd/yyyy')}</td>
        <td>{curPhysician.deaNumber}</td>
      </tr>
    })
  }

  return(
    <>
      <Row>
        <Col>
          <h1>Physicians</h1>
        </Col>
      </Row>
      <Table>
        <thead>
        <tr>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Email</th>
          <th>Date of Birth</th>
          <th>DEA Number</th>
        </tr>
        </thead>
        <tbody>
        {getPhysicianList()}
        </tbody>
      </Table>
      {userProfiles.data.currentProfile.profileType === 'internal' && (
        <Pagination as={'Container'} className='justify-content-end'>
          <Pagination.First onClick={() => setCurrentPage(1)}/>
          <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)}/>
          <Pagination.Item active>{currentPage}</Pagination.Item>
          <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)}/>
        </Pagination>
      )}
    </>
  )
}

export default List;
