import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

const CustomModal = ({ showModal, onClose, title, footer, children }: any) => {
  const [show, setShow] = useState(showModal);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  useEffect(() => {
    setShow(showModal);
  }, [showModal]);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {footer}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
