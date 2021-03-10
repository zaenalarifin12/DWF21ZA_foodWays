import React from "react";

import { Modal, Button, Form } from "react-bootstrap";

function Register(props) {

  

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ border: "none" }}>
        <Modal.Title>
          <h1 className="text-warning">Register</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              className="border border-choco bg-light"
              type="email"
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="border border-choco bg-light"
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="border border-choco bg-light"
              type="text"
              placeholder="Fullname"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="border border-choco bg-light"
              type="text"
              placeholder="Gender"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="border border-choco bg-light"
              type="number"
              placeholder="Phone"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="border border-choco bg-light"
              type="text"
              placeholder="As User bg-light"
            />
          </Form.Group>

          <div className="mt-5"></div>
          <Button className="btn-block btn-choco">Register</Button>
        </Form>

        <p className="text-secondary text-center mt-2">
          Already have an account ? Klik{" "}
          <span className="font-weight-bold"> Here </span>
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default Register;
