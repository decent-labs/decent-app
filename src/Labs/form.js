import {Col, Form} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import Button from "react-bootstrap/Button";
import React, {useState, useEffect} from "react";
import {getStateOptions} from "../Common/form";

function LabForm({
    submitHandler,
    name: oName,
    phoneNumber: oPhoneNumber,
    streetAddress: oStreetAddress,
    streetAddress2: oStreetAddress2,
    city: oCity,
    state: oState,
    zipCode: oZipCode,
    id: labOrgId,
}) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [streetAddress2, setStreetAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Select');
  const [zipCode, setZipCode] = useState('');
  const country = "us";
  
  useEffect(() => {
    setName(oName || '')
    setPhoneNumber(oPhoneNumber || '')
    setStreetAddress(oStreetAddress || '')
    setStreetAddress2(oStreetAddress2 || '')
    setCity(oCity || '')
    setState(oState || '')
    setZipCode(oZipCode || '')
  }, [oName, oPhoneNumber, oStreetAddress, oStreetAddress2, oCity, oState, oZipCode])

  function handleSubmit(event){
    event.preventDefault();
      submitHandler(event, { labOrgName: name, phoneNumber, streetAddress, streetAddress2, city, state, zipCode, country})
  }

  return (
    <Col lg={6} md={8}>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Col>
            <Form.Group className='required' controlId='formLabOrgName'>
              <Form.Label>Lab Organization Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Lab Name'
                autoComplete='Lab Organization Name'
                value={name}
                onChange={event => setName(event.target.value)}
                required
              />
            </Form.Group></Col>
          <Col><Form.Group className='required' controlId='formLabPhoneNumber'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type='text'
              placeholder='555-555-5555'
              autoComplete='phonenumber'
              value={phoneNumber}
              onChange={event => setPhoneNumber(event.target.value)}
              required
            />
          </Form.Group></Col>
        </Form.Row>
        <Form.Row>
          <Col><Form.Group controlId='formStreetAddress'>
            <Form.Label>Address line 1</Form.Label>
            <Form.Control
              type='text'
              placeholder='123 Address Way'
              value={streetAddress}
              onChange={event => setStreetAddress(event.target.value)}
            />
          </Form.Group></Col>
        </Form.Row>
        <Form.Row>
          <Col><Form.Group controlId='formStreetAddress2'>
            <Form.Label>Address line 2</Form.Label>
            <Form.Control
              type='text'
              placeholder='Apt. 8'
              value={streetAddress2}
              onChange={event => setStreetAddress2(event.target.value)}
            />
          </Form.Group></Col>
        </Form.Row>
        <Form.Row>
          <Col><Form.Group controlId='formCity'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='City'
              value={city}
              onChange={event => setCity(event.target.value)}
            />
          </Form.Group></Col>
          <Col><Form.Group controlId='formState'>
            <Form.Label>State</Form.Label>
            <Form.Control as='select'
                          value={state}
                          onChange={event => setState(event.target.value)}
            >
              {getStateOptions()}
            </Form.Control>
          </Form.Group></Col>
          <Col><Form.Group controlId='formzipCode'>
            <Form.Label>Zip code</Form.Label>
            <Form.Control
              type='text'
              placeholder='00000'
              value={zipCode}
              onChange={event => setZipCode(event.target.value)}
            />
          </Form.Group></Col>
        </Form.Row>
        <Form.Row className='justify-content-end align-middle'>
          <Form.Group style={{width:'50%'}} className='pt-4 d-flex flex-row align-items-center' controlId='formSubmit'>
            <NavLink className='font-weight-bold m-2' to={`/labs/${labOrgId}`}>Cancel</NavLink>
            <Button
              variant='primary'
              type='submit'
              block
              className='ml-5 styled-form-button'
            >
              Save
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
    </Col>
  )
}

export default LabForm;