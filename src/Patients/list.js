import React, {useCallback, useState} from "react";
import {Col, Pagination, Row, Table} from "react-bootstrap";
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";
import {Link} from "react-router-dom";
import {request} from "../requests";

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
      return new Date(e.dateWritten);
    })));
    return (`${mostRecentDate.getMonth()}/${mostRecentDate.getDay()}/${mostRecentDate.getFullYear()}`);
  }

  const patientRows = patients.data.patients.map((patient, index) =>{
    const dob = new Date(patient.dob)

    return (
      <tr key={index}>
        <td>{patient.lastName}</td>
        <td>{patient.firstName}</td>
        <td>{(`${dob.getMonth()}/${dob.getDay()}/${dob.getFullYear()}`)}</td>
        <td>{getLatestPrescriptionDate(patient)}</td>
        <td className='action-items'>
          <Link to={`patients/details/${index}`}>
            <div>
              <svg className="bi bi-eye-fill" width="1em" height="1em"
                    viewBox="0 0 16 16" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 8a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                <path fillRule="evenodd"
                  d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
                  clipRule="evenodd"/>
              </svg>
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
