import React from "react";
import {Col, Row} from "react-bootstrap";

function List() {

  return(
    <>
      <Row>
        <Col>
          <h1>Patients</h1>
        </Col>
      </Row>
      <Row className='mx-auto'>
        <Col>
          Last Name
        </Col>
        <Col>
          First Name
        </Col>
        <Col>
          Date of Birth
        </Col>
        <Col>
          Last Rx Date
        </Col>
        <Col>
          Actions
        </Col>
      </Row>

    </>
  )
}

export default List;
