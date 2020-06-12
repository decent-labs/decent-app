import React, {useState} from 'react';
import {Col, Form, Row} from "react-bootstrap";
import {request} from "../requests";
import Button from "react-bootstrap/Button";
import {formatHtmlDate} from "../Common/form";
import {useHistory} from "react-router-dom";

function Invite({alert}) {
  const history = useHistory();
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
    request(`invitation/outBound/hospital`, 'POST', {
      fullName,
      email,
      dob: formatHtmlDate(dob),
      language,
      gender,
      ssn,
      deaNumber,
      permissionGrants: []
    })
      .then(() => {
        alert({ message:'Successfully created an invitation', variant:'success'})
        history.replace('/physicians')
      })
      .catch(err => {
        console.log('error in creating invitation ', err);
        alert({ message:'There was an error in creating invitation, try again', variant: 'danger'})
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
      <Col lg={6} md={8}>
        <Row>
          <h1>Invite Physician</h1>
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
              type='date'
              placeholder='mm/dd/yyyy'
              autoComplete='dob'
              value={dob}
              onChange={event => setDob(event.target.value)}
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
            <Form.Label>Social Security Number</Form.Label>
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
          <Form.Row className='pt-4 justify-content-end'>
            <Form.Group style={{width:'33%'}} controlId='formSubmit'>
              <Button
                variant='primary'
                type='submit'
                block
                className='font-weight-bold styled-form-button'
              >
                Invite
              </Button>
            </Form.Group>
          </Form.Row>
        </Form>
      </Col>
    </>
  )
}

export default Invite;
