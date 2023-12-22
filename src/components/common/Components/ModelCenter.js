import React from "react";
import { XCircle } from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

const ModelCenter = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop={props.backdrop}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" className="w-100 d-flex justify-content-between">
          <div>{props.title}</div>
          <Link onClick={props.onHide} className="text-dark">
          <XCircle className="f-25"/>
          </Link>
        </Modal.Title>
      </Modal.Header>      
        <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
};

export default ModelCenter;
