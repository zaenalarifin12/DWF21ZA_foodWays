import React, { useState, useEffect, useReducer, useContext } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import Header from "../components/Header";
import { Input, Button, Form, Row, Col } from "react-bootstrap";

import SweetAlert from "react-bootstrap-sweetalert";
import ModalMap from "../components/ModalMap";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import ClipLoader from "react-spinners/ClipLoader";

function EditProfile(props) {
  let history = useHistory();

  const [form, setForm] = useState({
    fullName: "",
    gender: "",
    password: "",
    phone: "",
    location: "",
  });

  const [success, setSuccess] = useState(false);

  const {
    data: user,
    loading: loadingUser,
    error: errorUser,
    refetech: refetechUser,
  } = useQuery("profileCache", async () => {
    const response = await API.get("/check-auth");
    setForm({
      fullName: response.data.data.user.fullName,
      gender: response.data.data.user.gender,
      phone: response.data.data.user.phone,
      location: response.data.data.user.location,
    });
    return response;
  });

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
                
                  <h1 className="h3 my-4">My Profile   {loadingUser ? (
                    <ClipLoader
                    color="#8B572A" loading={true} />
                  ) : (
                    <></>
                  )}
                  </h1>
                
                  
                </Col>
              </Row>
              <Row>
                <Col>
                  <>
                    <Form>
                      <Row>
                        <Col xs={9}>
                          <Form.Group>
                            <Form.Control
                              className="border border-choco bg-light"
                              type="text"
                              value={form.fullName}
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
                              class="custom-file-label font-weight-normal bg-light border border-choco d-flex justify-content-around
          "
                              for="customFile"
                            >
                              <span>Attach Image</span>

                              <img
                                src="/icons/icon_file.svg"
                                style={{ height: 18 }}
                              />
                            </label>
                          </div>
                        </Col>
                      </Row>

                      <Form.Group>
                        <Form.Control
                          className="border border-choco bg-light"
                          type="text"
                          value={user?.data?.data?.user?.email}
                          placeholder="Email"
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          className="border border-choco bg-light"
                          type="text"
                          value={form.phone}
                          placeholder="Phone"
                        />
                      </Form.Group>
                      <Row>
                        <Col xs={9}>
                          <Form.Group>
                            <Form.Control
                              className="border border-choco bg-light"
                              type="text"
                              value={form.location}
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
                  </>
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
