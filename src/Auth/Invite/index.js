import React, {useEffect, useState} from 'react';

import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link, useHistory, useParams} from 'react-router-dom';

import { request } from '../../requests';
import DatePicker from "react-datepicker";
import {format} from 'date-fns';

function Invite({ alert }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [ssn, setSsn] = useState('');
  const [ssnIsValid, setSsnIsValid] = useState(true);
  const [deaNumber, setDeaNumber] = useState('');

  const history = useHistory();
  const { inviteCode } = useParams();

  const [valid, setValid] = useState(false);

  useEffect(() => {
    request(`invitation/${inviteCode}`)
      .then(response => {
        setValid(!response.inviteInfo.confirmed);
      })
      .catch(error => {
        setValid(false);
        alert({ message: 'Invalid Invite', variant: 'warning'})
      });
  }, [alert, inviteCode])

  function sendRequest() {
    request(`invitation/claimInvitation/${inviteCode}`, 'POST', { fullName, email, password, dob: format(dob, 'MM/dd/yyyy'), ssn, deaNumber })
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

  function validCode() {
    return (
      <>
        <h1>Claim Account</h1>
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
    );
  }

  return (
    <Col>
      {valid && validCode()}
      <div className='text-center'>
        <Link to='/auth/login'>Back to Login</Link>
      </div>
    </Col>
  );
}

export default Invite;
