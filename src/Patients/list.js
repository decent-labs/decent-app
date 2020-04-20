import React from "react";
import {Button, Col, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";

function List() {
  const history = useHistory();

  return(
    <>
      <Row>
        <Col>
          <h1>Patients</h1>
        </Col>
        <Col>
          <Button onClick={()=> history.push('/patients/newPatient')}>
            New Patient
          </Button>
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
