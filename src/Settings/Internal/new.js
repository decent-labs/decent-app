import React, {useState} from 'react';
import {Col, Form} from 'react-bootstrap';
import {useHistory} from "react-router-dom";
import {request} from "../../requests";
import Button from "react-bootstrap/Button";

function New({ alert }) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    return request('invitation/outBound/internal/0', 'POST', {
      email,
      fullName,
      permissionGrants: [ { userOrgTable: 'userInternals' } ]
    })
      .then(response => {
        alert({ message: 'New internal user added successfully', variant: 'success' });
        history.push(`/settings/internal`);
      }).catch(error => {
        alert({ message: 'Error with internal user invite', variant: 'danger' });
        console.log('Error with internal user invite', error);
      })
  }

  return (
    <Col>
      <h1>New Internal User</h1>
      <Col lg={4} md={6}>
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group className='required' as={Col} controlId='formEmail'>
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
              <Form.Group className='required' controlId='formFullName'>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Full Name'
                  autoComplete='fullName'
                  value={fullName}
                  onChange={event => setFullName(event.target.value)}
                  required
                />
              </Form.Group>
          </Form.Row>
          <Form.Row className='justify-content-end align-middle'>
            <Form.Group style={{width: '50%'}}className='d-flex flex-row align-items-center' controlId='formSubmit'>
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
    </Col>
  )
}
export default New;