import React, {useState, useContext} from "react";
import { useHistory } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { REGISTER } from "../../config/Constants";
function Register(props) {
  let history = useHistory();

  const { dispatch } = useContext(AuthContext);

  const initialState = {
    email: "",
    password: "",
    fullname: "",
    gender: "",
    phone: "",
    role: "",
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

    const user = { ...data, token: "12341234" };

    dispatch({
      type: REGISTER,
      payload: { user: user, token: "12341234" },
    });

    if (user.role == 1) {
      history.push("/");
    } else {
      history.push("/transaction");
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
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
              name="email"
              value={data.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="border border-choco bg-light"
              type="password"
              name="password"
              value={data.password}
              onChange={handleInputChange}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="border border-choco bg-light"
              type="text"
              name="fullname"
              value={data.fullname}
              onChange={handleInputChange}
              placeholder="Fullname"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="border border-choco bg-light"
              type="text"
              name="gender"
              value={data.gender}
              onChange={handleInputChange}
              placeholder="Gender"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="border border-choco bg-light"
              type="number"
              name="phone"
              value={data.phone}
              onChange={handleInputChange}
              placeholder="Phone"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control as="select" className="border border-choco bg-light"
            name="role"
            onChange={handleInputChange}
            >
              <option disabled selected>
                As User
              </option>
              <option value="1">Customer</option>
              <option value="2">Restaurant</option>
            </Form.Control>
          </Form.Group>

          <div className="mt-5"></div>
          <Button onClick={handleFormSubmit} className="btn-block btn-choco">Register</Button>
        </Form>

        <p className="text-secondary text-center mt-2">
          Already have an account ? Klik{" "}
          <span
            onClick={props.showLogin}
            className="font-weight-bold"
            style={{ cursor: "pointer" }}
          >
            {" "}
            Here{" "}
          </span>
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default Register;
