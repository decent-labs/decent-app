import React, {useState} from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
import {request} from "../requests";
import Button from "react-bootstrap/Button";
import {useHistory, useParams} from "react-router-dom";
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";
import {formatISO} from 'date-fns';
import DatePicker from "react-datepicker/es";

function New({alert}) {
  let { id } = useParams();
  const history = useHistory();
  const userProfiles = useAsyncState(StateProperty.userProfile);
  const [drugInfo, setDrugInfo] = useState('covid-19-test');
  const [expirationDate, setExpirationDate] = useState('');
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
        prescriptionSerialNumber: '1234', //TODO figure this out
        schedule: 'III',
        expirationDate: formatISO(expirationDate),
        writtenDate: formatISO(now),
        quantity: 1
      }})
      .then(() => {
        alert({ message:'successfully added prescription', variant:'success'})
        history.replace('/patients')
      })
      .catch(err => {
        console.log('error in new prescription ', err);
        alert({ message:'error in new prescription, try again', variant: 'danger'})
      })
  }

  return (
    <>
      <Container>
        <Row className='justify-content-center'>
          <h2>New Prescription</h2>
        </Row>
        <Form onSubmit={sendRequest}>
          <Form.Row className='justify-content-center'>
            <Form.Group className='required' lg={6} md={8} as={Col}>
              <Form.Label>Select item</Form.Label>
              <Form.Control as="select"
                            onChange={event => setDrugInfo(event.target.value)}
                            required>
                <option value='covid-19-test'>covid-19 test</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row className='justify-content-center'>
            <Form.Group className='required' lg={6} md={8} as={Col}>
              <Form.Label>Expiration Date</Form.Label>
              <DatePicker
                selected={expirationDate}
                onChange={date => setExpirationDate(date)}
                required
              />
            </Form.Group>
          </Form.Row>
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
          <Form.Row className='justify-content-center'>
            <Form.Group className='required' lg={6} md={8} as={Col}>
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
          <Form.Row className='justify-content-center'>
            <Form.Group className='required' lg={6} md={8} as={Col}>
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Additional information'
                value={notes}
                onChange={event => setNotes(event.target.value)}
                required
              ></Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row className='pt-2 justify-content-center'>
            <Form.Group controlId='formSubmit'>
              <Button
                variant='primary'
                type='submit'
                block
                className='font-weight-bold'
              >
                Save prescription and notify patient
              </Button>
            </Form.Group>
          </Form.Row>
        </Form>
      </Container>
    </>
  )
}

export default New;
