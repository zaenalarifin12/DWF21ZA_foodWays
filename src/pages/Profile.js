import React, { useState, useEffect, useReducer, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import Header from "./../parts/Header";
import { Input, Button, Form, Row, Col } from "react-bootstrap";
import ModalMap from "../parts/ModalMap";
import { OrderContext } from "../context/OrderContext";
import { formatRupiah } from "../utils/formatRupiah";

function Profile(props) {
  const [state, dispatch] = useContext(OrderContext);

  const user = JSON.parse(localStorage.getItem("user"));

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
                  <h1 className="h3 ">
                    {user.role == 1 ? "My Profile" : "Profile Partner"}
                  </h1>
                </Col>
              </Row>
              <Row className="float-left">
                <Col>
                  <img
                    src="/images/profile.png"
                    height="222"
                    className="rounded"
                    style={{ objectFit: "cover" }}
                  />
                  <Link to={`/edit-profile`} style={{ textDecoration: "none" }}>
                    <Button className="mt-4 btn btn-block btn-choco ">
                      Edit Profile
                    </Button>
                  </Link>
                </Col>

                <Col>
                  <div>
                    <span className="text-choco font-weight-bold">
                      Full Name
                    </span>
                  </div>
                  <div>
                    <span className="text-black font-weight-normal">Andi</span>
                  </div>

                  <div className="mt-4">
                    <span className="text-choco font-weight-bold">Email</span>
                  </div>
                  <div>
                    <span className="text-black font-weight-normal">
                      Andi@gmail.com
                    </span>
                  </div>
                  <div className="mt-4">
                    <span className="text-choco font-weight-bold">Phone</span>
                  </div>
                  <div>
                    <span className="text-black font-weight-normal">
                      80978778787
                    </span>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  <h1 className="h3 ">History Transaction</h1>
                </Col>
              </Row>
              {state.transaction != null ? (
                state.transaction.map((tr) => {
                  return (
                    <Row className="bg-white p-2 rounded my-2">
                      <Col>
                        <div>
                          
                            {user.role == 1 ? (
                              <span className="h5">
                              {tr.nameSeller}
                              </span>
                            ) : (
                              <span className="h5">
                              {tr.nameCustomer}
                              </span>
                            )}
                          
                        </div>
                        <div>
                          <span>{tr.date}</span>
                        </div>
                        <div className="mt-4">
                          <span
                            className="font-weight-bold"
                            style={{ color: "#974A4A" }}
                          >
                            Total : {formatRupiah(tr.total)}
                          </span>
                        </div>
                      </Col>
                      <Col>
                        <Row className="d-flex justify-content-end">
                          <img src="/images/logo.png" />
                        </Row>
                        <Row className="mt-4 d-flex justify-content-end ">
                          <Button
                            variant="light"
                            className="bg-finish btn text-success font-weight-normal disabled"
                          >
                            Finished
                          </Button>
                        </Row>
                      </Col>
                    </Row>
                  );
                })
              ) : (
                <Row>data kosong</Row>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Profile;
