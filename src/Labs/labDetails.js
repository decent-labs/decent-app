import React  from "react";
import { Button, Col, Row} from "react-bootstrap";
import List from "./Agent/listTable";
import { Link } from "react-router-dom"

export default function LabDetails({labDetails}) {
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
             {(labDetails.streetAddress && labDetails.streetAdress2 &&`${labDetails.streetAddress} ${labDetails.streetAddress2}`) || 'n/a' }
             { labDetails.city && labDetails.state && labDetails.zipCode &&
                `${labDetails.city} ${labDetails.state} ${labDetails.zipCode}`}
              </address>
            <Link to={`/labs/${labDetails.id}/edit`}><Button>Edit</Button></Link>
            </Col>
          </Row>
        </Col>
      </Row>
      <hr />
	  <List {...labDetails } />
      <Row/>
    </>
  )
}
