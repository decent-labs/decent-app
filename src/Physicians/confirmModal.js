import React from 'react';
import {Button, Modal} from "react-bootstrap";

function ConfirmModal({show, message, closeHandler, confirmHandler}) {
  return (
    <Modal show={show} onHide={closeHandler} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Physician</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this Physician {message}?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeHandler}>
          Cancel
        </Button>
        <Button className='styled-form-button' variant="danger" onClick={confirmHandler}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmModal;
