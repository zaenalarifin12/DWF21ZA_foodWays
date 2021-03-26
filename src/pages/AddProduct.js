import React, { useState, useEffect, useReducer, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import Header from "../components/Header";
import { Input, Button, Form, Row, Col } from "react-bootstrap";
import ModalMap from "../components/ModalMap";
import SweetAlert from "react-bootstrap-sweetalert";
import { useMutation } from "react-query";
import { API } from "../config/api";

function AddProduct(props) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: null,
  });

  const { title, price, image } = form;

  const [success, setSuccess] = useState(false);

  const addProduct = useMutation(async () => {
    const body = new FormData();

    body.append("title", title);
    body.append("price", price);
    body.append("image", image);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await API.post("/product", body, config);

    setForm({
      title: "",
      price: "",
      image: null,
    });
  });

  const onChange = (e) => {
    const tempForm = { ...form };
    tempForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;

    setForm(tempForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct.mutate();

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
            setSuccess(false);
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
                  <h1 className="h3 my-4">Add Product</h1>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form onSubmit={(e) => handleSubmit(e)}>
                    <Row>
                      <Col xs={8}>
                        <Form.Group>
                          <Form.Control
                            className="border border-choco bg-light"
                            type="text"
                            name="title"
                            onChange={(e) => onChange(e)}
                            placeholder="Title"
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <div class="custom-file">
                          <input
                            type="file"
                            class="custom-file-input "
                            name="image"
                            onChange={(e) => onChange(e)}
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
                        name="price"
                        onChange={(e) => onChange(e)}
                        placeholder="Price"
                      />
                    </Form.Group>

                    <div className="mt-5"></div>

                    <Button
                      type="submit"
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
