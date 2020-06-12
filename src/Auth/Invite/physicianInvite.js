import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {request} from "../../requests";
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
    request(`invitation/claimInvitation/${inviteCode}`, 'POST', { fullName, email, password, dob: dob.replace(/[/]/g, '-'), ssn, deaNumber })
      .then(() => {
        alert({ message: 'Invite Successfully Accepted', variant: 'primary' })
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
            type='date'
            placeholder='mm/dd/yy'
            autoComplete='dob'
            value={dob}
            onChange={event => setDob(event.target.value)}
            required
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
        <Form.Row className='pt-4 justify-content-center'>
          <Form.Group controlId='formSubmit'>
            <Button
              variant='primary'
              type='submit'
              block
              className='font-weight-bold styled-form-button'
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
