import React, {useCallback, useState} from "react";
import {Col, Pagination, Row} from "react-bootstrap";
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";
import {request} from "../requests";
import ListTable from "./listTable";
import {getPrescriptionData} from "../Common/form";

function List() {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState({
      currentPage: 0,
      from: 0,
      lastPage: 0,
      perPage: 0,
      to: 0,
      total: 0,
      disabled: true
  });
  const lastPage = parseInt(paginationData.lastPage);
  const pdCurrentPage = parseInt(paginationData.currentPage);
  const userProfiles = useAsyncState(StateProperty.userProfile);
  const patientsLoader = useCallback(async () => {
      let patients;
      if(userProfiles.data.currentProfile.profileType === 'patient') {
        patients = userProfiles.data.profiles
          .filter(curProfile => curProfile.profileType === 'patient')
          .map(curPatient => request(`patients/${curPatient.profileId}/profile`, 'GET'));
      }else if(userProfiles.data.currentProfile.profileType === 'prescriber') {
        let patientProfiles = await request(`prescribers/${userProfiles.data.currentProfile.profileId}/patients?currentPage=${currentPage}&perPage=10`, 'GET')
        patients = patientProfiles.patients.map(curPatient => request(`patients/${curPatient.patientId}/profile`, 'GET'))
        setPaginationData(patientProfiles.pagination)
      }else if(['internal','labOrg', 'labAgent'].includes(userProfiles.data.currentProfile.profileType)) {
        let patientProfiles = await request(`patients/list?currentPage=${currentPage}`, 'GET')
        patients = patientProfiles.profile.data.map(curPatient => request(`patients/${curPatient.id}/profile`, 'GET'))
        setPaginationData(patientProfiles.profile.pagination);
      }

      return getPrescriptionData(patients);
    },
    [userProfiles.data.profiles, userProfiles.data.currentProfile, currentPage]);
  const patients = useAsyncState(StateProperty.patients, patientsLoader);

  function showTable() {
    if(patients.data.length > 0)
      return <>
        <ListTable patients={patients.data}></ListTable>
        {
         ['internal','labOrg', 'labAgent', 'prescriber'].includes(userProfiles.data.currentProfile.profileType)
         && !paginationData.disabled
         && (
          <Pagination as={'Container'} className='justify-content-end'>
            { pdCurrentPage > 1 && <Pagination.First onClick={() => setCurrentPage(1)}/> }
            { pdCurrentPage > 1 && <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)}/> }
            <Pagination.Item active>{currentPage}</Pagination.Item>
            {pdCurrentPage < lastPage && <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)}/> }
          </Pagination>
        )}
      </>
    return <div><h4>You have no patients yet</h4></div>

  }

  return(
    <>
      <Row className='mx-0'>
        <Col>
          <h1>Patients</h1>
        </Col>
      </Row>
      {showTable()}

    </>
  )
}

export default List;
