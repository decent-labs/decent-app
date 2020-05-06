import {Col, Form} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";

function PatientForm({submitHandler}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ssn, setSsn] = useState('');
  const [ssnIsValid, setSsnIsValid] = useState(true);
  const [streetAddress, setStreetAddress] = useState('');
  const [streetAddress2, setStreetAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [zipCodeIsValid, setZipCodeIsValid] = useState(false);

  function getStateList() {
    const states = {
      "AL": "Alabama",
      "AK": "Alaska",
      "AS": "American Samoa",
      "AZ": "Arizona",
      "AR": "Arkansas",
      "CA": "California",
      "CO": "Colorado",
      "CT": "Connecticut",
      "DE": "Delaware",
      "DC": "District Of Columbia",
      "FM": "Federated States Of Micronesia",
      "FL": "Florida",
      "GA": "Georgia",
      "GU": "Guam",
      "HI": "Hawaii",
      "ID": "Idaho",
      "IL": "Illinois",
      "IN": "Indiana",
      "IA": "Iowa",
      "KS": "Kansas",
      "KY": "Kentucky",
      "LA": "Louisiana",
      "ME": "Maine",
      "MH": "Marshall Islands",
      "MD": "Maryland",
      "MA": "Massachusetts",
      "MI": "Michigan",
      "MN": "Minnesota",
      "MS": "Mississippi",
      "MO": "Missouri",
      "MT": "Montana",
      "NE": "Nebraska",
      "NV": "Nevada",
      "NH": "New Hampshire",
      "NJ": "New Jersey",
      "NM": "New Mexico",
      "NY": "New York",
      "NC": "North Carolina",
      "ND": "North Dakota",
      "MP": "Northern Mariana Islands",
      "OH": "Ohio",
      "OK": "Oklahoma",
      "OR": "Oregon",
      "PW": "Palau",
      "PA": "Pennsylvania",
      "PR": "Puerto Rico",
      "RI": "Rhode Island",
      "SC": "South Carolina",
      "SD": "South Dakota",
      "TN": "Tennessee",
      "TX": "Texas",
      "UT": "Utah",
      "VT": "Vermont",
      "VI": "Virgin Islands",
      "VA": "Virginia",
      "WA": "Washington",
      "WV": "West Virginia",
      "WI": "Wisconsin",
      "WY": "Wyoming"
    };
    return [
      <option value='' key={'default'}>Select</option>,
      Object.keys(states).map((abbre) => {
        return <option value={abbre} key={abbre}>{states[abbre]}</option>;
      })
    ];
  }

  function formatSsn(){
    const ssnRegex = /(\d{3})(\d{2})(\d{4})/;
    const ssnCheck = ssnRegex.test(ssn);
    setSsnIsValid(ssnCheck);
    if(ssnCheck)
      setSsn(ssn.replace(ssnRegex,"$1-$2-$3"));
  }

  function validateZipCode(zip)
  {
    const regexp = /^[0-9]{5}?$/;
    if(zip !== '')
      setZipCodeIsValid(regexp.test(zip));
  }

  function handleSubmit(event){
    event.preventDefault();
    submitHandler(event, { email, firstName, lastName, dob, phoneNumber, ssn, streetAddress, streetAddress2, city, state, zipCode})
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group className='required' lg={6} md={8} as={Col} controlId='formEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='you@email.com'
            autoComplete='email'
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Col>
          <Form.Group className='required' controlId='formFirstName'>
            <Form.Label>First name</Form.Label>
            <Form.Control
              type='text'
              placeholder='First'
              autoComplete='firstName'
              value={firstName}
              onChange={event => setFirstName(event.target.value)}
              required
            />
          </Form.Group></Col>
        <Col><Form.Group className='required' controlId='formLastName'>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Last'
            autoComplete='username'
            value={lastName}
            onChange={event => setLastName(event.target.value)}
            required
          />
        </Form.Group></Col>
      </Form.Row>
      <Form.Row>
        <Col><Form.Group className='required' controlId='formDOB'>
          <Form.Label>Date of birth</Form.Label>
          <Form.Control
            type='date'
            placeholder='mm/dd/yy'
            autoComplete='dob'
            value={dob}
            onChange={event => setDob(event.target.value)}
            required
          />
        </Form.Group></Col>
        <Col><Form.Group controlId='formPhoneNumber'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type='tel'
            placeholder='555-555-5555'
            value={phoneNumber}
            onChange={event => setPhoneNumber(event.target.value)}
          />
        </Form.Group></Col>
      </Form.Row>
      <Form.Row>
        <Form.Group className='required' lg={4} md={8} as={Col} controlId='formSsn'>
          <Form.Label>Social Security</Form.Label>
          <Form.Control
            type='text'
            maxLength={11}
            minLength={11}
            placeholder='555-55-5555'
            value={ssn}
            onChange={event => setSsn(event.target.value)}
            onBlur={event => formatSsn()}
            isInvalid={!ssnIsValid}
            required
          />
        </Form.Group>
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
                        defaultValue='Select'
                        onChange={event => setState(event.target.value)}
          >
            {getStateList()}
          </Form.Control>
        </Form.Group></Col>
        <Col><Form.Group controlId='formzipCode'>
          <Form.Label>Zip code</Form.Label>
          <Form.Control
            type='text'
            placeholder='00000'
            value={zipCode}
            onChange={event => setZipCode(event.target.value)}
            onBlur={event => validateZipCode(event.target.value)}
            isValid={zipCodeIsValid}
            isInvalid={(zipCode !== '') && !zipCodeIsValid}
          />
          <Form.Control.Feedback type="invalid">
            The entered zip code is invalid
          </Form.Control.Feedback>
        </Form.Group></Col>
      </Form.Row>
      <Form.Row className='justify-content-end align-middle'>
        <Form.Group className='d-flex flex-row align-items-center' controlId='formSubmit'>
          <NavLink className='font-weight-bold m-2' to='/patients'>Cancel</NavLink>
          <Button
            variant='primary'
            type='submit'
            block
            className='ml-5'
          >
            Save
          </Button>
        </Form.Group>
      </Form.Row>
    </Form>
  )
}

export default PatientForm;
