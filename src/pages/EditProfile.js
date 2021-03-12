import React, { useState, useEffect, useReducer, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import Header from "./../parts/Header";
import { Input, Button, Form, Row, Col } from "react-bootstrap";
import ModalMap from "../parts/ModalMap";

function EditProfile(props) {
  return (
    <div className="bg-warning">
      <Header />

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
                        <Button className="btn-block btn-choco">
                          Select On Map <img src="icons/map.svg" />
                        </Button>
                      </Col>
                    </Row>

                    <div className="mt-5"></div>
                    <Link to={`/profile`}>
                      <Button className="float-right px-5 btn-choco">
                        Save
                      </Button>
                    </Link>
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
