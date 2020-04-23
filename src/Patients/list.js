import React, {useCallback} from "react";
import {Col, Row, Table} from "react-bootstrap";
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";
import {request} from "../requests";

function List() {
  const userProfiles = useAsyncState(StateProperty.userProfile);
  const patientsLoader = useCallback(() => {
    let patients;
      if(userProfiles.data.currentProfile.profileType === 'patient') {
        patients = userProfiles.data.profiles
          .filter(curProfile => curProfile.profileType === 'patient')
          .map(curProfile => request(`patients/${curProfile.profileId}/profile`, 'GET'));
      }else if(userProfiles.data.currentProfile.profileType === 'prescriber') {
        patients = request(`prescribers/${userProfiles.data.currentProfile.profileId}/patients`, 'GET')
          .then(results =>
            results.patients.map(curPatient => request(`patients/${curPatient.patientId}/profile`, 'GET'))
          )
      }

      console.log('patients ',patients);
      return Promise.all(patients)
        .then(profiles => profiles.map(curProfile => curProfile.profile))
        .then(values => values)
    },
    [userProfiles.data.profiles, userProfiles.data.currentProfile]);
  const patients = useAsyncState(StateProperty.patients, patientsLoader);

  const patientRows = patients.data.patients.map((patient, index) =>
    <tr key={index}>
      <td>{patient.lastName}</td>
      <td>{patient.firstName}</td>
      <td>{patient.dob}</td>
      <td>{}</td>
      <td>{}</td>
    </tr>
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
    </>
  )
}

export default List;
