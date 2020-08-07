import React, {useState} from 'react';
import {Col, Form, Row} from "react-bootstrap";
import {request} from "../requests";
import Button from "react-bootstrap/Button";
import {useHistory, useParams} from "react-router-dom";
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";
import {formatISO} from 'date-fns';
import {getPrescriptionData} from "../redux/reducers/async/prescription";
import {useDispatch} from "react-redux";
import {dataUpdateAction} from "../redux/reducers/async";

function New({alert}) {
  let { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const userProfiles = useAsyncState(StateProperty.userProfile);
  const patients = useAsyncState(StateProperty.patients);
  const [drugInfo, ] = useState('covid-19-test');
  // const [expirationDate, setExpirationDate] = useState('');
  const [directions, setDirections] = useState('');
  const [notes, setNotes] = useState('');
  function sendRequest(event) {
    event.preventDefault();
    const now = new Date();
    request(`rxs`, 'POST', {prescriptionInfo:{
        profileId: userProfiles.data.currentProfile.profileId,
        patientId: id,
        drugInfo: drugInfo,
        directions: directions,
        genericSubstitutionAllowed: true,
        notes: notes,
        schedule: 'III',
        // expirationDate: formatISO(expirationDate),
        writtenDate: formatISO(now),
        quantity: 1
      }})
      .then(() => {
        alert({ message:'Test kit successfully added', variant:'success'})
        let foundPatientIndex;
        patients.data.patients.find((patient, index) => {
          if(patient.id === Number(id)){
            foundPatientIndex = index;
            return true;
          }
          return false;
        });
        const updatedPatients = patients.data;
        getPrescriptionData([request(`patients/${id}/profile`)])
          .then(response => {
            updatedPatients.patients[foundPatientIndex] = response[0];
            dispatch(dataUpdateAction(StateProperty.patients, updatedPatients));
            history.replace(`/patients/${id}`)
          });
      })
      .catch(err => {
        console.log('Error in adding a new test kit ', err);
        alert({ message:'Error in adding a new test kit, try again', variant: 'danger'})
      })
  }

  return (
    <>
      <Col lg={6} md={8}>
        <Row>
          <h2>New Test Kit</h2>
        </Row>
        <Form onSubmit={sendRequest}>
          {/*<Form.Row>*/}
          {/*  <Form.Group className='required' as={Col}>*/}
          {/*    <Form.Label>Select item</Form.Label>*/}
          {/*    <Form.Control as="select"*/}
          {/*                  onChange={event => setDrugInfo(event.target.value)}*/}
          {/*                  required>*/}
          {/*      <option value='covid-19-test'>covid-19 test</option>*/}
          {/*    </Form.Control>*/}
          {/*  </Form.Group>*/}
          {/*</Form.Row>*/}
          {/*<Form.Row className='justify-content-center'>*/}
          {/*  <Form.Group className='required' lg={6} md={8} as={Col}>*/}
          {/*    <Form.Label>Expiration Date</Form.Label>*/}
          {/*    <DatePicker*/}
          {/*      selected={expirationDate}*/}
          {/*      onChange={date => setExpirationDate(date)}*/}
          {/*      required*/}
          {/*    />*/}
          {/*  </Form.Group>*/}
          {/*</Form.Row>*/}
          {/*<Form.Row className='justify-content-center'>*/}
          {/*  <Form.Group className='required' lg={3} md={4} as={Col}>*/}
          {/*    <Form.Label>Detail</Form.Label>*/}
          {/*    <Form.Control*/}
          {/*      value={detail}*/}
          {/*      onChange={event => setDetail(event.target.value)}*/}
          {/*      required*/}
          {/*    >*/}

          {/*    </Form.Control>*/}
          {/*  </Form.Group>*/}
          {/*  <Form.Group className='required' lg={3} md={4} as={Col}>*/}
          {/*    <Form.Label>Detail</Form.Label>*/}
          {/*    <Form.Control as='select'*/}
          {/*                  required>*/}

          {/*    </Form.Control>*/}
          {/*  </Form.Group>*/}
          {/*</Form.Row>*/}
          {/*<Form.Row className='justify-content-center'>*/}
          {/*  <Form.Group className='required' lg={6} md={8} as={Col}>*/}
          {/*    <Form.Label>Diagnosis code</Form.Label>*/}
          {/*    <Form.Control as='select'*/}
          {/*                  required>*/}

          {/*    </Form.Control>*/}
          {/*  </Form.Group>*/}
          {/*</Form.Row>*/}
          {/*<Form.Group className='required m-3 justify-content-center' lg={6} md={8} as={Row}>*/}
          {/*    <Form.Label className='pr-2'>Generic Allowed?</Form.Label>*/}
          {/*      <Form.Check*/}
          {/*        type='radio'*/}
          {/*        label='yes'*/}
          {/*      />*/}
          {/*      <Form.Check*/}
          {/*        type='radio'*/}
          {/*        label='no'*/}
          {/*        className='ml-3'*/}
          {/*      />*/}
          {/*</Form.Group>*/}
          {/*<Form.Row className='justify-content-center'>*/}
          {/*  <Form.Group className='required' lg={6} md={8} as={Col}>*/}
          {/*    <Form.Label>Pharmacy</Form.Label>*/}
          {/*    <Form.Control as='select'></Form.Control>*/}
          {/*  </Form.Group>*/}
          {/*</Form.Row>*/}
          <Form.Row>
            <Form.Group className='required' as={Col}>
              <Form.Label>Directions</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Directions for patient'
                value={directions}
                onChange={event => setDirections(event.target.value)}
                required
              ></Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Additional information'
                value={notes}
                onChange={event => setNotes(event.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row className='pt-2 justify-content-end'>
            <Form.Group controlId='formSubmit'>
              <Button
                variant='primary'
                type='submit'
                block
                className='font-weight-bold styled-form-button'
              >
                Save and notify patient
              </Button>
            </Form.Group>
          </Form.Row>
        </Form>
      </Col>
    </>
  )
}
export default New;