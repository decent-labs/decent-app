import React, {  useCallback, useState, useEffect } from "react";
import {Col, Pagination, Row} from "react-bootstrap";
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";
import {request} from "../requests";
import ListTable from "./listTable";
import { getPrescriptionData } from "../redux/reducers/async/prescription";
import queryString from 'qs';
import { useHistory, useLocation } from 'react-router-dom';
import isEmpty from 'lodash.isempty';

function List() {
  const location = useLocation();
  const history  = useHistory();
  const queryState = location.search;
  const { currentPage: qsCurrentPage }      = queryString.parse(queryState.slice(1));
  const [currentPage, setCurrentPageState]  = useState(1);
  const [paginationData, setPaginationData] = useState({
      currentPage,
      from: 0,
      lastPage: 0,
      perPage: 0,
      to: 0,
      total: 0,
      disabled: true
  });
  const updatePaging = (data) => setPaginationData(data);
  const lastPage = parseInt(paginationData.lastPage);
  const pdCurrentPage = parseInt(paginationData.currentPage);
  const userProfiles = useAsyncState(StateProperty.userProfile);
  const setCurrentPage = page => {
      setCurrentPageState(page);
      history.push(`/patients?currentPage=${page}`);
  };

  useEffect( () => {
      if (isEmpty(qsCurrentPage)) {
	  setCurrentPageState(1);
	  return;
      }
      setCurrentPageState(parseInt(qsCurrentPage));
  }, [ qsCurrentPage ]);

  const patientsLoader = useCallback(async () => {
      let patients;
      if(userProfiles.data.currentProfile.profileType === 'patient') {
        patients = userProfiles.data.profiles
          .filter(curProfile => curProfile.profileType === 'patient')
          .map(curPatient => request(`patients/${curPatient.profileId}/profile`, 'GET'));
        updatePaging({ disabled: true });
      }else if(userProfiles.data.currentProfile.profileType === 'prescriber') {
        let patientProfiles = await request(`prescribers/${userProfiles.data.currentProfile.profileId}/patients?currentPage=${currentPage}&perPage=10`, 'GET')
        patients = patientProfiles.patients.map(curPatient => request(`patients/${curPatient.patientId}/profile`, 'GET'))
        updatePaging(patientProfiles.pagination)
      }else if(['internal','labOrg', 'labAgent'].includes(userProfiles.data.currentProfile.profileType)) {
        let patientProfiles = await request(`patients/list?currentPage=${currentPage}`, 'GET')
        patients = patientProfiles.profile.data.map(curPatient => request(`patients/${curPatient.id}/profile`, 'GET'))
        updatePaging(patientProfiles.profile.pagination);
      }
      const results = await getPrescriptionData(patients);
      return { patients: results, pagination: {}};
    },
    [userProfiles.data.profiles, userProfiles.data.currentProfile, currentPage ]);

  const patients = useAsyncState(StateProperty.patients, patientsLoader);

  function showTable() {
    let table;
    if(patients.data.patients.length > 0)
      table = <ListTable patients={patients.data.patients}></ListTable>
    else
      table = patients.isLoading
	  ? <div><h4>Loading patients list...</h4></div>
	  : <div><h4>You have no patients yet</h4></div>

      return <>
      {table}
        {
         ['internal', 'labOrg', 'labAgent', 'prescriber'].includes(userProfiles.data.currentProfile.profileType)
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

  }

  const PatientTitle = () => {
    switch (userProfiles.data.currentProfile.profileType) {
      case "patient":
      case "prescriber": {
        return "My Patients"
      }
      default: {
        return "Patients"
      }
    }
  }

  return(
    <>
      <Row className='mx-0'>
        <Col>
          <h1><PatientTitle /></h1>
        </Col>
      </Row>
      {showTable()}

    </>
  )
}

export default List;
