import React, {useState} from 'react';
import {Container, Form, Row} from "react-bootstrap";
import {request} from "../requests";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import {useHistory} from "react-router-dom";
import {useAsyncState} from "../redux/actions/useAsyncState";
import {StateProperty} from "../redux/reducers";

function Invite({alert}) {
  const history = useHistory();
  const userProfiles = useAsyncState(StateProperty.userProfile);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [language, setLanguage] = useState('');
  const [gender, setGender] = useState('');
  const [ssn, setSsn] = useState('');
  const [ssnIsValid, setSsnIsValid] = useState(true);
  const [deaNumber, setDeaNumber] = useState('');

  function sendRequest(event) {
    event.preventDefault();
    request(`invitation/outBound/hospital/${userProfiles.data.currentProfile.entityId}`, 'POST', {
      fullName,
      email,
      dob,
      language,
      gender,
      ssn,
      deaNumber
    })
      .then(() => {
        alert({ message:'successfully created invitation', variant:'success'})
        history.replace('/physicians')
      })
      .catch(err => {
        console.log('error in creating invitation ', err);
        alert({ message:'error in creating invitation, try again', variant: 'danger'})
      })
  }

  function formatSsn(){
    const ssnRegex = /(\d{3})(\d{2})(\d{4})/;
    const ssnCheck = ssnRegex.test(ssn);
    setSsnIsValid(ssnCheck);
    if(ssnCheck)
      setSsn(ssn.replace(ssnRegex,"$1-$2-$3"));
  }

  return (
    <>
      <Container>
        <Row className='justify-content-center'>
          <h2>Invite Physician</h2>
        </Row>
        <Form onSubmit={sendRequest}>
          <Form.Group className='required'>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={event => setFullName(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='required'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='required'>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              as={DatePicker}
              selected={dob}
              onChange={date => setDob(date)}
              showMonthDropdown
              showYearDropdown
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Language</Form.Label>
            <Form.Control
              value={language}
              onChange={event => setLanguage(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Gender</Form.Label>
            <Form.Control
              value={gender}
              onChange={event => setGender(event.target.value)}
            />
          </Form.Group>
          <Form.Group className='required'>
            <Form.Label>SSN</Form.Label>
            <Form.Control
              value={ssn}
              onChange={event => setSsn(event.target.value)}
              onBlur={formatSsn}
              isInvalid={!ssnIsValid}
              required
            />
          </Form.Group>
          <Form.Group className='required'>
            <Form.Label>DEA Number</Form.Label>
            <Form.Control
              value={deaNumber}
              onChange={event => setDeaNumber(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Row className='pt-2 justify-content-center'>
            <Form.Group controlId='formSubmit'>
              <Button
                variant='primary'
                type='submit'
                block
                className='font-weight-bold'
              >
                Invite
              </Button>
            </Form.Group>
          </Form.Row>
        </Form>
      </Container>
    </>
  )
}

export default Invite;
