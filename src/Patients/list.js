import React, {useCallback, useState} from "react";
import {Col, Image, Pagination, Row, Table} from "react-bootstrap";
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";
import {Link} from "react-router-dom";
import {request} from "../requests";
import { format } from 'date-fns';
import PatientDetailsIcon from '../assets/images/bmx-patient-details-icon.svg';

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
      }else if(userProfiles.data.currentProfile.profileType === 'internal') {
        let patientProfiles = await request(`patients/list?currentPage=${currentPage}`, 'GET')
        patients = patientProfiles.profile.data.map(curPatient => request(`patients/${curPatient.id}/profile`, 'GET'))
      }

      return Promise.all(patients)
        .then(profiles => Promise.all(profiles.map(curProfile =>
            request(`patients/${curProfile.profile.id}/rxs`, 'GET')
              .then(results => {
                curProfile.profile.prescriptions = results.prescriptions;
                return curProfile.profile;
              })
          ))
        )
    },
    [userProfiles.data.profiles, userProfiles.data.currentProfile, currentPage]);
  const patients = useAsyncState(StateProperty.patients, patientsLoader);

  function getLatestPrescriptionDate(patient) {
    if(!!patient.prescriptions === false || patient.prescriptions.length === 0){
      return 'n/a';
    }
    var mostRecentDate = new Date(Math.max.apply(null, patient.prescriptions.map( e => {
      return new Date(e.writtenDate);
    })));
    return (format(mostRecentDate, 'MM/dd/yyyy'));
  }

  const patientRows = patients.data.patients.map((patient, index) =>{
    return (
      <tr key={index}>
        <td>{patient.lastName}</td>
        <td>{patient.firstName}</td>
        <td>{format(new Date(patient.dob), 'MM/dd/yyyy')}</td>
        <td>{getLatestPrescriptionDate(patient)}</td>
        <td className='action-items'>
          <Link to={`patients/${patient.id}`}>
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
      <Row>
        <Col>
          <h1>Patients</h1>
        </Col>
      </Row>
      <Table>
        <thead>
        <tr>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Date of Birth</th>
          <th>Last Rx Date</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {patientRows}
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
