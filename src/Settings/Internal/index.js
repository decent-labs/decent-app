import React, {useCallback, useState} from 'react';
import {Button, Col, Image, Row, Table} from "react-bootstrap";
import {Link, useRouteMatch} from "react-router-dom";
import Trash
  from "../../assets/images/trash.svg";
import {useAsyncState} from "../../redux/actions/useAsyncState";
import {StateProperty} from "../../redux/reducers";
import PersonPlus from "../../assets/images/person-plus.svg";
import {request} from "../../requests";
import ConfirmModal from "./confirmModal";
import {useDispatch} from "react-redux";
import {dataSetAction} from "../../redux/reducers/async";

function Internal({alert}) {
  const dispatch = useDispatch();
  const userProfiles = useAsyncState(StateProperty.userProfile);
  const internalUsersLoader = useCallback(() => {
    return request('internal/admins', 'GET')
  },[])
  const internalUsers = useAsyncState(StateProperty.internalUsers, internalUsersLoader);
  const match = useRouteMatch();
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({});


  function deleteModal(user) {
    setCurrentUser(user);
    setShowModal(true);
  }

  function deleteUser() {
    request(`internal/admins/${currentUser.id}`, 'DELETE')
      .then(() => {
        alert({ message:'Internal user was successfully deleted', variant:'success'});
        dispatch(dataSetAction(StateProperty.internalUsers, {admins: internalUsers.data.splice(internalUsers.data.find(user => user.id === currentUser.id), 1)}))
        setCurrentUser({});
      })
      .catch((e) => {
        alert({ message:'Error deleting user', variant:'danger'});
        console.log('Error deleting user', e);
      })
  }

  const internalRows = internalUsers.data.map((internalUser, index) =>{
    return (
      <tr key={index}>
        <td className='first-row-element'>{internalUser.fullName}</td>
        <td>{internalUser.email}</td>
        <td className='action-items last-row-element'>
          <div>
            {userProfiles.data.currentProfile.profileId !== internalUser.id &&
              <div className="icon" onClick={() => deleteModal(internalUser)}>
                <Image src={Trash} />
              </div>
            }
          </div>
        </td>
      </tr>
    )
  })

  return (
    <>
      <Link to={`${match.path}/new`} className='float-right'>
        <Button className='styled-form-button'><Image src={PersonPlus}/> New Internal User</Button>
      </Link>
      <Row>
        <Col>
          <h3>Manage Internal Users</h3>
        </Col>
      </Row>
      <Table>
        <thead>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {internalRows}
        </tbody>
      </Table>
      <ConfirmModal
        show={showModal}
        message={`${currentUser.fullName}`}
        closeHandler={() => setShowModal(false)}
        confirmHandler={() => {
          deleteUser()
          setShowModal(false);
        }}/>
    </>
  );
}

export default Internal;
