import React, { useEffect, useCallback, useState } from "react";
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
import TrashIcon from "../assets/images/trash.svg";
import ConfirmModal from "./confirmModal";
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'qs';
import isEmpty from 'lodash.isempty';
function List({alert}) {
  const location = useLocation();
  const history  = useHistory();
  const { currentPage: qsCurrentPage } = queryString.parse(location.search.slice(1));
  const [currentPage, setCurrentPageState] = useState(null);
  const setCurrentPage = page => {
      setCurrentPageState(page);
      history.push(`/physicians?currentPage=${page}`);
  };
  const [paginationData, setPaginationData] = useState({
      currentPage,
      from: 0,
      lastPage: 0,
      perPage: 0,
      to: 0,
      total: 0,
      disabled: true
  });
  const lastPage = parseInt(paginationData.lastPage);
  const pdCurrentPage = parseInt(paginationData.currentPage);
  const [showModal, setShowModal] = useState(false);
  const [currentPhysician, setCurrentPhysician] = useState({});
  const [updateList, setUpdateList] = useState(true);

  useEffect(() => {
      if (isEmpty(qsCurrentPage)) {
        setCurrentPageState(1);
        return;
      }
      setCurrentPageState(parseInt(qsCurrentPage));
  }, [ qsCurrentPage ]);

  const userProfiles = useAsyncState(StateProperty.userProfile);
  const physiciansLoader = useCallback(async () => {
      if (currentPage === null) return { prescribers: [] };
      return request(`prescribers?currentPage=${currentPage}&perPage=10`, 'GET')
        .then(results => {
          setPaginationData(results.pagination);
          if(updateList) setUpdateList(false)
          return results
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
        alert({ message:'Physician was successfully deleted', variant:'success'});
        setCurrentPhysician({});
        setUpdateList(true);
      })
      .catch((e) => {
        alert({ message:'Error deleting physician', variant:'danger'});
        console.log('Error deleting physician', e);
      })
  }

  function getPhysicianList() {
    return physicians.data.prescribers.map((curPhysician, index) => {
      return <tr key={index}>
        <td className='first-row-element'>{curPhysician.lastName}</td>
        <td>{curPhysician.firstName}</td>
        <td>{curPhysician.email}</td>
        <td>{new Date(curPhysician.dob).toLocaleDateString(undefined, { timeZone: 'UTC' })}</td>
        <td>{curPhysician.deaNumber}</td>
        <td className='action-items last-row-element'>
          <div onClick={() => deletePhysicianModal(curPhysician)}>
            <Image src={TrashIcon} />
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
      { !paginationData.disabled && 
        userProfiles.data.currentProfile.profileType === 'internal' && (
        <Pagination as={'Container'} className='justify-content-end'>
          { pdCurrentPage > 1 &&
          <Pagination.First onClick={() => setCurrentPage(1)}/>
          }
          { pdCurrentPage > 1 &&
          <Pagination.Prev onClick={() => setCurrentPage(currentPage -1)}/>
          }
          <Pagination.Item active>{currentPage}</Pagination.Item>
          { pdCurrentPage < lastPage  &&
          <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)}/>
          }
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
