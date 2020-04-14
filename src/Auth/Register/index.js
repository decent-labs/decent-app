import React, { useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import {Link, useHistory, useLocation} from 'react-router-dom';


import { request } from '../../requests';

function Register() {
    const [, setCookie] = useCookies(['token']);
    const history = useHistory();
    const location = useLocation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordIsInvalid, setPasswordIsInvalid] = useState(true);
    const [dob, setDob] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [ssn, setSsn] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [streetAddress2, setStreetAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setPassword('');
        setPasswordConfirm('');
    }, [error]);

    function sendRequest() {
        request('auth/registerPatient', 'POST', { email, password, passwordConfirmation: passwordConfirm, firstName, lastName, dob, phoneNumber, ssn, streetAddress, streetAddress2, city, state, zipCode})
            .then(response => {
                setIsLoading(false);
                const expires = new Date();
                expires.setDate(expires.getDate() + parseInt(process.env.REACT_APP_TOKEN_COOKIE_EXPIRATION_DAYS, 10));
                setCookie('token', response.token, { expires, path: '/' });
                history.replace(location.state || { from: { pathname: '/' } });
            })
            .catch(error => {
                setIsLoading(false);
                setError(error);
            });
    }

    function checkPassword() {
        const isPasswordEqual = password !== passwordConfirm;
        if (isPasswordEqual) {
            setPasswordIsInvalid(false);
        }else {
            setPasswordIsInvalid(true);
        }
        return isPasswordEqual;
    }

    return (
        <Col>
            <h1>Register a New Patient</h1>
            <Form onSubmit={event => event.preventDefault()}>
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
                    <Col><Form.Group className='required' controlId='formPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='••••••••'
                            autoComplete='current-password'
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            isInvalid={!passwordIsInvalid}
                            required
                        />
                    </Form.Group></Col>
                    <Col><Form.Group className='required' controlId='formpasswordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='••••••••'
                            autoComplete='current-password'
                            value={passwordConfirm}
                            onChange={event => setPasswordConfirm(event.target.value)}
                            onBlur={() => checkPassword()}
                            isInvalid={!passwordIsInvalid}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            The password does not match
                        </Form.Control.Feedback>
                    </Form.Group></Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <Form.Group className='required' controlId='formFirstName'>
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='first'
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
                            placeholder='555-55-5555'
                            value={ssn}
                            onChange={event => setSsn(event.target.value)}
                            required
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Col><Form.Group controlId='formStreetAddress'>
                        <Form.Label>Address line 1</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='e.g., 123 Address Way'
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
                            placeholder='e.g., Apt. 8'
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
                        <Form.Control
                            type='text'
                            placeholder='Select'
                            value={state}
                            onChange={event => setState(event.target.value)}
                        />
                    </Form.Group></Col>
                    <Col><Form.Group controlId='formzipCode'>
                        <Form.Label>zip code</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='00000'
                            value={zipCode}
                            onChange={event => setZipCode(event.target.value)}
                        />
                    </Form.Group></Col>
                </Form.Row>

                <Form.Group controlId='formError'>
                    {error && <Alert variant='danger'>{error}</Alert>}
                </Form.Group>
                <Form.Row className='justify-content-center'>
                    <Form.Group lg={6} md={8} as={Col} controlId='formSubmit'>
                        <Button
                            variant='primary'
                            type='submit'
                            block
                            className='font-weight-bold'
                            disabled={isLoading}
                            onClick={() => {
                                setError('');
                                if (checkPassword()) {
                                    setError('Password does not match Confirm New Password');
                                    return;
                                }
                                sendRequest()
                            }}
                        >
                            Signup
                        </Button>
                    </Form.Group>
                </Form.Row>
            </Form>
            <div className='text-center'>
                <Link to='/auth/login'>Back to Login</Link>
            </div>
        </Col>
    );
}

export default Register;
