import React  from "react";
import { Button, Col, Row} from "react-bootstrap";
import List from "./Agent/listTable";
import { Link } from "react-router-dom"

export default function LabDetails({labDetails, users}) {
  return (
    <>
      <Row>
        <Col md={4} className='nameCard'>
          <h2>{`${labDetails.name}`}</h2>
          <Row>
            <Col className='nameCard-header'>
              <p>
                Phone
              </p>
              <p>
                Address
              </p>
            </Col>
            <Col>
              <p>
                {labDetails.phoneNumber || 'n/a'}
              </p>
              <address>
                {labDetails.streetAddress && <>{labDetails.streetAddress}<br /></> }
                {labDetails.streetAddress2 && <>{labDetails.streetAddress2}<br /></> }
                {labDetails.city && <>{labDetails.city},</>} {labDetails.state} {labDetails.zipCode}
              </address>
            <Link to={`/labs/${labDetails.id}/edit`}><Button className='styled-form-button px-5'>Edit</Button></Link>
            </Col>
          </Row>
        </Col>
      </Row>
      <hr />
	  <List {...labDetails } users={users} />
      <Row/>
    </>
  )
}

