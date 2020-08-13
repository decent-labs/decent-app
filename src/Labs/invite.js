import React, {useState} from 'react';
import {Col, Form, Row} from "react-bootstrap";
import {request} from "../requests";
import Button from "react-bootstrap/Button";
import {useHistory, useParams} from "react-router-dom";
import {formatHtmlDate, getStateOptions} from "../Common/form";

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
      dob: formatHtmlDate(dob),
      licenseNumber,
      stateOfLicense,
      organizationName
    })
      .then(() => {
        alert({ message:'Successfully created an invitation', variant:'success'})
        history.replace('/labs')
      })
      .catch(err => {
        console.error(err);
        alert({ message:'Error in creating invitation, try again', variant: 'danger'})
      })
  }

  return (
    <>
      <Col lg={6} md={8}>
        <Row>
          <h2>Invite Lab Technician</h2>
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
              type='date'
              placeholder='mm/dd/yy'
              autoComplete='dob'
              value={dob}
              onChange={event => setDob(event.target.value)}
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
          <Form.Row className='pt-4 justify-content-end'>
            <Form.Group controlId='formSubmit'>
              <Button
                variant='primary'
                type='submit'
                block
                className='styled-form-button'
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
