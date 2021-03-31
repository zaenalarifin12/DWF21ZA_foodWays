import React, { useState, useEffect, useReducer, useContext } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import Header from "../components/Header";
import { Input, Button, Form, Row, Col } from "react-bootstrap";

import SweetAlert from "react-bootstrap-sweetalert";
import ModalMap from "../components/ModalMap";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import ClipLoader from "react-spinners/ClipLoader";
import { MapContext } from "../context/MapContext";
import MapWithCardBottomProfile from "../components/MapWithCardBottomProfile";

function EditProfile(props) {
  let history = useHistory();

  const [form, setForm] = useState({
    fullName: "",
    password: "",
    phone: "",
    image: null,
    location: "",
  });

  const { fullName, password, phone, image, location } = form;

  const [success, setSuccess] = useState(false);

  const [textError, setTextError] = useState("");

  const [modalError, setModalError] = useState(false);

  const {
    data: user,
    loading: loadingUser,
    error: errorUser,
    refetech: refetechUser,
  } = useQuery("profileCache", async () => {
    const response = await API.get("/check-auth");
    setForm({
      ...form,
      fullName: response.data.data.user.fullName,
      phone: response.data.data.user.phone,
      location: response.data.data.user.location,
    });

    return response;
  });

  const [modalMapShow, setModalMapShow] = useState(false);

  const [stateMap, dispatchMap] = useContext(MapContext);

  const onChange = (e) => {
    const tempForm = { ...form };
    tempForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;

    setForm(tempForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = new FormData();

      body.append("fullName", fullName);
      body.append("phone", phone);
      body.append("location", location);
      body.append("image", image);
      body.append("password", password);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await API.put(`/user`, body, config)
        .then((data) => {
          setSuccess(true);
          console.log("berhasil");
          setForm({
            fullName: "",
            password: "",
            phone: "",
            image: null,
            location: "",
          });
        })
        .catch((error) => {
          if (error.response.status == 400) {
            setModalError(true);
            setTextError(error.response.data.error.message);
          }
          console.log(error);
        });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#E5E5E5",
        height: "100vh",
      }}
    >
      <Header />

      {modalError ? (
        <SweetAlert
          danger
          title={textError}
          onConfirm={() => setModalError(false)}
          timeout={2000}
        ></SweetAlert>
      ) : (
        <></>
      )}

      {success ? (
        <SweetAlert
          success
          title="Profile has updated"
          onConfirm={() => {
            history.push("/profile");
          }}
          timeout={5000}
        ></SweetAlert>
      ) : (
        <></>
      )}

      <div>
        <div className="container pt-5">
          <Row>
            <Col>
              <Row>
                <Col>
                  <h1 className="h3 my-4">
                    My Profile{" "}
                    {loadingUser ? (
                      <ClipLoader color="#8B572A" loading={true} />
                    ) : (
                      <></>
                    )}
                  </h1>
                </Col>
              </Row>
              <Row>
                <Col>
                  <>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                      <Row>
                        <Col xs={9}>
                          <Form.Group>
                            <Form.Control
                              className="border border-choco bg-light"
                              type="text"
                              name="fullName"
                              value={fullName}
                              onChange={(e) => onChange(e)}
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
                              onChange={(e) => onChange(e)}
                              name="image"
                            />
                            <label
                              class="custom-file-label font-weight-normal bg-light border border-choco d-flex justify-content-around"
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
                          className="border border-choco text-white bg-choco"
                          type="text"
                          value={user?.data?.data?.user?.email}
                          placeholder="Email"
                          disabled
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          className="border border-choco bg-light"
                          type="password"
                          name="password"
                          value={password}
                          onChange={(e) => onChange(e)}
                          placeholder="Password ( isi jika ingin mengganti )"
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          className="border border-choco bg-light"
                          type="text"
                          name="phone"
                          value={phone}
                          onChange={(e) => onChange(e)}
                          placeholder="Phone"
                        />
                      </Form.Group>
                      <Row>
                        <Col xs={9}>
                          <Form.Group>
                            <Form.Control
                              className="border border-choco bg-light"
                              type="text"
                              name="location"
                              value={location}
                              onChange={(e) => onChange(e)}
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

                          <MapWithCardBottomProfile
                            show={modalMapShow}
                            // onHide={() => setModalMapShow(false)}
                            onClickButton={() => {
                              setForm({
                                ...form,
                                location: `${stateMap.longtitude},${stateMap.latitude}`,
                              });

                              setModalMapShow(false);
                            }}
                          />
                        </Col>
                      </Row>

                      <div className="mt-5"></div>

                      <Button
                        type="submit"
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
