import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import {request} from "../../requests";
import {format} from "date-fns";
import {useHistory, useParams} from "react-router-dom";

function PhysicianInvite({alert}) {
  const { inviteCode } = useParams();
  const history = useHistory();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [ssn, setSsn] = useState('');
  const [ssnIsValid, setSsnIsValid] = useState(true);
  const [deaNumber, setDeaNumber] = useState('');

  function sendRequest() {
    request(`invitation/claimInvitation/${inviteCode}`, 'POST', { fullName, email, password, dob: format(dob, 'MM/dd/yyyy'), ssn, deaNumber, permissionGrants:[] })
      .then(() => {
        alert({ message: 'Accepted Invite', variant: 'primary' })
        history.push('/auth/login')
      })
      .catch(error => {
        alert({ message: 'Error with accepting invite', variant: 'warning' })
        console.log('error ', error);
      });
  }

  function formatSsn(){
    const ssnRegex = /(\d{3})(\d{2})(\d{4})/;
    const ssnCheck = ssnRegex.test(ssn)
    setSsnIsValid(ssnCheck);
    if(ssnCheck)
      setSsn(ssn.replace(ssnRegex,"$1-$2-$3"));
  }

  return (
    <>
      <h1>Claim Physician Account</h1>
      <Form onSubmit={event => {
        event.preventDefault();
        sendRequest();
      }}>
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
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={event => setPassword(event.target.value)}
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
              Accept
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
    </>
  )
}

export default PhysicianInvite;
