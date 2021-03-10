import React from "react";
import { withRouter } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

function Login(props) {

  const handleLogin = () => {
    localStorage.setItem("token", "1234");
    props.history.push("/")
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ border: "none" }}>
        <Modal.Title>
          <h1 className="text-warning">Login</h1>
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
          
          <div className="mt-5"></div>
          <Button onClick={handleLogin} className="btn-block btn-choco">Login</Button>
        </Form>

        <p className="text-secondary text-center mt-2">
        Don't have an account ? Klik{" "}
          <span className="font-weight-bold"> Here </span>
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default withRouter(Login);
