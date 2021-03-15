import React, { useState, useEffect, useReducer, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import Header from "./../parts/Header";
import { Input, Button, Form, Row, Col } from "react-bootstrap";
import ModalMap from "../parts/ModalMap";
import SweetAlert from "react-bootstrap-sweetalert";

function AddProduct(props) {
  const [success, setSuccess] = useState(false);

  const handleAddProduct = () => {
    setSuccess(true);
  };

  return (
    <div className="bg-warning">
      <Header />

      {success ? (
        <SweetAlert
          success
          title="Produk berhasil ditambah!"
          onConfirm={() => {
            setSuccess(false)
          }}
          timeout={2000}
        >
        </SweetAlert>
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
                  <h1 className="h3 my-4">Add Product</h1>
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
                            placeholder="Title"
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
                        type="number"
                        placeholder="Price"
                      />
                    </Form.Group>

                    <div className="mt-5"></div>

                    <Button
                      onClick={handleAddProduct}
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

export default AddProduct;
