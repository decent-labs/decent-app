import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import List from "./Agent/listTable";
import { Link, useRouteMatch } from "react-router-dom"
import { useAsyncState } from "../redux/actions/useAsyncState";
import { StateProperty } from "../redux/reducers";
import pencil from "../assets/images/bmx-pencil.svg";

export default function LabDetails({ labDetails, users }) {
  const userProfiles = useAsyncState(StateProperty.userProfile);
  const match = useRouteMatch();

  const Address = () => {
    if (
      labDetails.streetAddress.trim().length === 0 &&
      labDetails.streetAddress2.trim().length === 0 &&
      labDetails.city.trim().length === 0 &&
      labDetails.state.trim().length === 0 &&
      labDetails.zipCode.trim().length === 0
    ) return <address>n/a</address>

    return (
      <address>
        {labDetails.streetAddress && <>{labDetails.streetAddress}<br /></>}
        {labDetails.streetAddress2 && <>{labDetails.streetAddress2}<br /></>}
        {labDetails.city && <>{labDetails.city},</>} {labDetails.state} {labDetails.zipCode}
      </address>
    )
  }

  return (
    <>
      <Row>
        <Col md="auto">
          <div className='nameCard'>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <h2>{`${labDetails.name}`}</h2>
                  </Col>
                </Row>
                <Row className="d-table-row">
                  <Col className='nameCard-header d-table-cell pb-1 pl-0' sm="auto">Phone</Col>
                  <Col className="d-table-cell">{labDetails.phoneNumber || 'n/a'}</Col>
                </Row>
                <Row className="d-table-row">
                  <Col className='nameCard-header d-table-cell pb-1 pl-0' sm="auto">Address</Col>
                  <Col className="d-table-cell"><Address /></Col>
                </Row>
              </Col>
              <Col md="auto">
                <Link to={`/labs/${labDetails.id}/edit`} className="edit-profile">
                  <img src={pencil} alt="edit" className="pr-1" />
                  <u>Edit laboratory</u>
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
        <Col>
          {userProfiles.data.currentProfile.admin &&
            <Link to={`${match.url}/invite`} className='float-right'>
              <Button className='styled-form-button px-5'>New Agent</Button>
            </Link>
          }
        </Col>
      </Row>
      <hr />
      <List {...labDetails} users={users} />
    </>
  )
}

