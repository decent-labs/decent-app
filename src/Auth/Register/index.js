import React, { useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useHistory, useLocation } from 'react-router-dom';

import { request } from '../../requests';

function Login() {
    const [setCookie] = useCookies(['token']);
    const history = useHistory();
    const location = useLocation();

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const [ssn, setSsn] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [token, setToken] = useState('');

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setPassword('');
        setToken('');
    }, [error]);

    function sendRequest() {
        request('auth/register', 'POST', { email, password, token })
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

    return (
        <Col>
            <h1>Register a New Patient</h1>
            <Form onSubmit={event => event.preventDefault()}>
                <Form.Row>
                    <Col><Form.Group controlId='formEmail'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='you@email.com'
                            autoComplete='email'
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                    </Form.Group></Col>
                </Form.Row>
                <Form.Row>
                    <Col><Form.Group controlId='formPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='••••••••'
                            autoComplete='current-password'
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </Form.Group></Col>
                    <Col><Form.Group controlId='formConfirmPAssword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='••••••••'
                            autoComplete='current-password'
                            value={confirmPassword}
                            onChange={event => setConfirmPassword(event.target.value)}
                        />
                    </Form.Group></Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <Form.Group controlId='formFName'>
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='first'
                                autoComplete='fname'
                                value={fname}
                                onChange={event => setFname(event.target.value)}
                            />
                        </Form.Group></Col>
                    <Col><Form.Group controlId='formLName'>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Last'
                            autoComplete='username'
                            value={lname}
                            onChange={event => setLname(event.target.value)}
                        />
                    </Form.Group></Col>
                </Form.Row>
                <Form.Row>
                    <Col><Form.Group controlId='formDOB'>
                        <Form.Label>Date of birth</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='mm/dd/yy'
                            autoComplete='dob'
                            value={dob}
                            onChange={event => setDob(event.target.value)}
                        />
                    </Form.Group></Col>
                    <Col><Form.Group controlId='formPhone'>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='555-555-5555'
                            value={phone}
                            onChange={event => setPhone(event.target.value)}
                        />
                    </Form.Group></Col>
                </Form.Row>
                <Form.Row>
                    <Col><Form.Group controlId='formSsn'>
                        <Form.Label>Social Security</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='555-55-5555'
                            value={ssn}
                            onChange={event => setSsn(event.target.value)}
                        />
                    </Form.Group></Col>
                </Form.Row>
                <Form.Row>
                    <Col><Form.Group controlId='formAddress1'>
                        <Form.Label>Address line 1</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='e.g., 123 Address Way'
                            value={address1}
                            onChange={event => setAddress1(event.target.value)}
                        />
                    </Form.Group></Col>
                </Form.Row>
                <Form.Row>
                    <Col><Form.Group controlId='formAddress2'>
                        <Form.Label>Address line 2</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='e.g., Apt. 8'
                            value={address2}
                            onChange={event => setAddress2(event.target.value)}
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
                    <Col><Form.Group controlId='formZip'>
                        <Form.Label>Zip</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='00000'
                            value={zip}
                            onChange={event => setZip(event.target.value)}
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
                            onClick={() => sendRequest()}
                        >
                            Signup
                        </Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </Col>
    );
}

export default Login;
