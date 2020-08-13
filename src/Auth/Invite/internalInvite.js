import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {request} from "../../requests";
import {useHistory, useParams} from "react-router-dom";

function InternalInvite({alert}) {
  const { inviteCode } = useParams();
  const history = useHistory();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function sendRequest() {
    request(`invitation/claimInvitation/${inviteCode}`, 'POST', { fullName, email, password, permissionGrants:[{ userOrgTable: 'userInternals' }] })
      .then(() => {
        alert({ message: 'Accepted Invite', variant: 'primary' })
        history.push('/auth/login')
      })
      .catch(error => {
        alert({ message: 'Error with accepting invite', variant: 'warning' })
        console.error(error);
      });
  }

  return (
    <>
      <h1>Claim Internal Account</h1>
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

export default InternalInvite;
