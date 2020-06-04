import React, {useCallback, useState} from "react";
import {Col, Pagination, Row} from "react-bootstrap";
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";
import {request} from "../requests";
import ListTable from "./listTable";
import {getPrescriptionData} from "../Common/form";

function List() {
  const [currentPage, setCurrentPage] = useState(1);
  const userProfiles = useAsyncState(StateProperty.userProfile);
  const patientsLoader = useCallback(async () => {
      let patients;
      if(userProfiles.data.currentProfile.profileType === 'patient') {
        patients = userProfiles.data.profiles
          .filter(curProfile => curProfile.profileType === 'patient')
          .map(curPatient => request(`patients/${curPatient.profileId}/profile`, 'GET'));
      }else if(userProfiles.data.currentProfile.profileType === 'prescriber') {
        let patientProfiles = await request(`prescribers/${userProfiles.data.currentProfile.profileId}/patients`, 'GET')
        patients = patientProfiles.patients.map(curPatient => request(`patients/${curPatient.patientId}/profile`, 'GET'))
      }else if(['internal','labOrg', 'labAgent'].includes(userProfiles.data.currentProfile.profileType)) {
        let patientProfiles = await request(`patients/list?currentPage=${currentPage}`, 'GET')
        patients = patientProfiles.profile.data.map(curPatient => request(`patients/${curPatient.id}/profile`, 'GET'))
      }

      return getPrescriptionData(patients);
    },
    [userProfiles.data.profiles, userProfiles.data.currentProfile, currentPage]);
  const patients = useAsyncState(StateProperty.patients, patientsLoader);

  function showTable() {
    if(patients.data.length > 0)
      return <>
        <ListTable patients={patients.data}></ListTable>
        {userProfiles.data.currentProfile.profileType === 'internal' && (
          <Pagination as={'Container'} className='justify-content-end'>
            <Pagination.First onClick={() => setCurrentPage(1)}/>
            <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)}/>
            <Pagination.Item active>{currentPage}</Pagination.Item>
            <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)}/>
          </Pagination>
        )}
      </>
    return <div><h4>You have no patients yet</h4></div>

  }

  return(
    <>
      <Row>
        <Col>
          <h1>Patients</h1>
        </Col>
      </Row>
      {showTable()}

    </>
  )
}

export default List;
