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
  return (
    <>
      <Row>
        <Col md={6}>
          <div className='nameCard'>
            <Row>
              <Col><Row>
                <Col>
                  <h2>{`${labDetails.name}`}</h2>
                </Col>
              </Row>
                <Row className="mb-1">
                  <Col className='nameCard-header'>Phone</Col>
                  <Col>{labDetails.phoneNumber || 'n/a'}</Col>
                </Row>
                <Row className="mb-1">
                  <Col className='nameCard-header'>Address</Col>
                  <Col>
                    <address>
                      {labDetails.streetAddress && <>{labDetails.streetAddress}<br /></>}
                      {labDetails.streetAddress2 && <>{labDetails.streetAddress2}<br /></>}
                      {labDetails.city && <>{labDetails.city},</>} {labDetails.state} {labDetails.zipCode}
                    </address>
                  </Col>
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

