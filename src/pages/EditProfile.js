import React, { useState, useEffect, useReducer, useContext } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import Header from "./../parts/Header";
import { Input, Button, Form, Row, Col } from "react-bootstrap";

import SweetAlert from "react-bootstrap-sweetalert";
import ModalMap from "../parts/ModalMap";

function EditProfile(props) {
  let history = useHistory();

  const [success, setSuccess] = useState(false);

  const [modalMapShow, setModalMapShow] = useState(false);

  const handleSaveProfile = () => {
    setSuccess(true);
  };

  return (
    <div className="bg-warning">
      <Header />

      {success ? (
        <SweetAlert
          success
          title="Profile has updated"
          onConfirm={() => {
            history.push("/profile");
          }}
          timeout={2000}
        ></SweetAlert>
      ) : (
        <></>
      )}

      <div
        className=""
        style={{
          backgroundColor: "#E5E5E5",
          height: "100vh",
        }}
      >
        <div className="container pt-5">
          <Row>
            <Col>
              <Row>
                <Col>
                  <h1 className="h3 my-4">My Profile</h1>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form>
                    <Row>
                      <Col xs={8}>
                        <Form.Group>
                          <Form.Control
                            className="border border-choco bg-light"
                            type="text"
                            placeholder="Full Name"
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <div class="custom-file">
                          <input
                            type="file"
                            class="custom-file-input "
                            id="customFile"
                          />
                          <label
                            class="custom-file-label bg-light border border-choco"
                            for="customFile"
                          >
                            Choose file
                          </label>
                        </div>
                      </Col>
                    </Row>

                    <Form.Group>
                      <Form.Control
                        className="border border-choco bg-light"
                        type="text"
                        placeholder="Email"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        className="border border-choco bg-light"
                        type="text"
                        placeholder="Phone"
                      />
                    </Form.Group>
                    <Row>
                      <Col xs={8}>
                        <Form.Group>
                          <Form.Control
                            className="border border-choco bg-light"
                            type="text"
                            placeholder="Location"
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Button
                          onClick={() => setModalMapShow(true)}
                          size="lg"
                          className="btn-block btn-choco"
                        >
                          Select On Map <img src="icons/map.svg" />
                        </Button>

                        <ModalMap
                          show={modalMapShow}
                          onHide={() => setModalMapShow(false)}
                        />
                      </Col>
                    </Row>

                    <div className="mt-5"></div>

                    <Button
                      onClick={handleSaveProfile}
                      className="float-right px-5 btn-choco"
                    >
                      Save
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
