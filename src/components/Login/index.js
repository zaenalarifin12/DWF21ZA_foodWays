import React, { useState, useContext } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { LOGIN } from "../../config/Constants";
import Register from "../Register";

function Login(props) {
  let history = useHistory();
  
  const { dispatch } = useContext(AuthContext);

  const initialState = {
    email: "",
    password: "",
    isSubmiting: false,
  };

  const [data, setData] = useState(initialState);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      isSubmiting: true,
    });

    const user = { ...data, token: "12341234", role: 1 };

    dispatch({
      type: LOGIN,
      payload: { user: user, token: "12341234" },
    });
    
    history.push("/");
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton style={{ border: "none" }}>
          <Modal.Title>
            <h1 className="text-warning">Login</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group>
              <Form.Control
                className="border border-choco bg-light"
                type="email"
                placeholder="Email"
                value={data.email}
                onChange={handleInputChange}
                name="email"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="border border-choco bg-light"
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={handleInputChange}
                name="password"
              />
            </Form.Group>

            <div className="mt-5"></div>
            <Button
              type="submit"
              disabled={data.isSubmiting}
              className="btn-block btn-choco"
            >
              {data.isSubmiting ? "Loading" : "Login"}
            </Button>
          </Form>

          <p className="text-secondary text-center mt-2">
            Don't have an account ? Klik{" "}
            <span
            onClick={props.showRegister}
            style={{ cursor: "pointer" }} className="font-weight-bold">
              {" "}
              Here{" "}
            </span>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default withRouter(Login);
