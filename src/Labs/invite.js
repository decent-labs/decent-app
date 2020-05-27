import React, {useState} from 'react';
import {Container, Form, Row} from "react-bootstrap";
import {request} from "../requests";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import {useHistory, useParams} from "react-router-dom";
import {format} from 'date-fns';
import {getStateOptions} from "../Common/form";

function Invite({alert}) {
  const history = useHistory();
  const {labOrgId} = useParams();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [stateOfLicense, setStateOfLicense] = useState('');
  const [organizationName, setOrganizationName] = useState('');

  function sendRequest(event) {
    event.preventDefault();
    request(`laborgs/${labOrgId}/agents`, 'POST', {
      email,
      firstName,
      lastName,
      dob: format(dob, 'MM/dd/yyyy'),
      licenseNumber,
      stateOfLicense,
      organizationName
    })
      .then(() => {
        alert({ message:'successfully created invitation', variant:'success'})
        history.replace('/labs')
      })
      .catch(err => {
        console.log('error in creating invitation ', err);
        alert({ message:'error in creating invitation, try again', variant: 'danger'})
      })
  }

  return (
    <>
      <Container>
        <Row className='justify-content-center'>
          <h2>Invite Lab Agent</h2>
        </Row>
        <Form onSubmit={sendRequest}>
          <Form.Group className='required'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              value={firstName}
              onChange={event => setFirstName(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='required'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              value={lastName}
              onChange={event => setLastName(event.target.value)}
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
          <Form.Group className='required'>
            <Form.Label>License Number</Form.Label>
            <Form.Control
              value={licenseNumber}
              onChange={event => setLicenseNumber(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='required'>
            <Form.Label>State of License</Form.Label>
            <Form.Control as='select'
                          defaultValue='Select'
                          onChange={event => setStateOfLicense(event.target.value)}
            >
              {getStateOptions()}
            </Form.Control>
          </Form.Group>
          <Form.Group className='required'>
            <Form.Label>Organization Name</Form.Label>
            <Form.Control
              value={organizationName}
              onChange={event => setOrganizationName(event.target.value)}
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
