import { ConfirmContext } from '@definitions/confirm-context';
import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmPopup = () => {
  const { showConfirm, confirmMessage, handleHideConfirm, handleConfirm }: any = useContext(ConfirmContext);

  return (
    <Modal show={showConfirm} onHide={handleHideConfirm}>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{confirmMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleHideConfirm}>
          Hủy bỏ
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmPopup;
