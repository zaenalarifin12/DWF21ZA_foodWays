import React, { useState, useContext } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { HIDE_MODAL_AUTH_ALL, LOGIN } from "../../config/Constants";
import Register from "../Register";
import { API, setAuthToken } from "../../config/api";
import { ModalAuthContext } from "../../context/ModalAuthContext";

function Login(props) {
  let history = useHistory();

  const [state, dispatch] = useContext(AuthContext);
  const [stateAuthModal, dispatchAuthModal] = useContext(ModalAuthContext);

  const initialState = {
    email: "",
    password: "",
  };

  const [data, setData] = useState(initialState);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setData({
      ...data,
    });

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(data);

      const response = await API.post("/login", body, config);

      dispatch({
        type: LOGIN,
        payload: response.data.data.user,
      });

      setAuthToken(response.data.data.user.token);

      dispatchAuthModal({
        type: HIDE_MODAL_AUTH_ALL,
      });
      
      history.push("/");
    } catch (error) {}

    // const user = { ...data, token: "12341234", role: 1 };

    // console.log(user);
    // history.push("/");
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
          <Form onSubmit={(e) => handleFormSubmit(e)}>
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
              Login
            </Button>
          </Form>

          <p className="text-secondary text-center mt-2">
            Don't have an account ? Klik{" "}
            <span
              onClick={props.showRegister}
              style={{ cursor: "pointer" }}
              className="font-weight-bold"
            >
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
