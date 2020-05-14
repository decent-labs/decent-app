import React, {useCallback, useState} from "react";
import {
  Col,
  Image,
  Pagination,
  Row,
  Table
} from "react-bootstrap";
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";
import {request} from "../requests";
import {format} from "date-fns";
import PatientDetailsIcon from "../assets/images/bmx-patient-details-icon.svg";
import ConfirmModal from "./confirmModal";

function List({alert}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [currentPhysician, setCurrentPhysician] = useState({});
  const [updateList, setUpdateList] = useState(true);


  const userProfiles = useAsyncState(StateProperty.userProfile);
  const physiciansLoader = useCallback(async () => {
      return request(`prescribers?currentPage=${currentPage}`, 'GET')
        .then(results => {
          if(updateList) setUpdateList(false)
          return results.prescribers
        });
    },
    [currentPage, updateList, setUpdateList]);
  const physicians = useAsyncState(StateProperty.physicians, physiciansLoader);

  function deletePhysicianModal(physician) {
    setCurrentPhysician(physician);
    setShowModal(true);
  }

  function deletePhysician() {
    request(`prescribers/${currentPhysician.id}/profile`, 'DELETE')
      .then(() => {
        alert({ message:'successfully deleted', variant:'success'});
        setCurrentPhysician({});
        setUpdateList(true);
      })
      .catch(() => alert({ message:'error deleting', variant:'danger'}))
  }

  function getPhysicianList() {
    return physicians.data.map((curPhysician, index) => {
      return <tr key={index}>
        <td>{curPhysician.lastName}</td>
        <td>{curPhysician.firstName}</td>
        <td>{curPhysician.email}</td>
        <td>{format(new Date(curPhysician.dob),'MM/dd/yyyy')}</td>
        <td>{curPhysician.deaNumber}</td>
        <td className='action-items'>
            <div onClick={() => deletePhysicianModal(curPhysician)}>
              <Image src={PatientDetailsIcon} />
            </div>
        </td>
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
      <ConfirmModal
        show={showModal}
        message={`${currentPhysician.firstName} ${currentPhysician.lastName}`}
        closeHandler={() => setShowModal(false)}
        confirmHandler={() => {
          deletePhysician()
          setShowModal(false);
        }}/>
    </>
  )
}

export default List;
