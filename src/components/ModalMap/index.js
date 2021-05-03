import React from "react";
import { Modal } from "react-bootstrap";

import Map from "../Map";

const ModalMap = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body style={{padding:0}}>
        <div>
          <Map />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalMap;
