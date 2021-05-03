import React, { useState, useEffect, useReducer, useContext } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import Header from "../components/Header";
import { Input, Button, Form, Row, Col } from "react-bootstrap";
import ModalMap from "../components/ModalMap";
import SweetAlert from "react-bootstrap-sweetalert";
import { useMutation } from "react-query";
import { API } from "../config/api";

function AddProduct(props) {
  const history = useHistory();

  const [form, setForm] = useState({
    title: "",
    price: "",
    image: null,
  });

  const { title, price, image } = form;

  const [success, setSuccess] = useState(false);
  const [textSuccess, setTextSuccess] = useState("");

  const [modalError, setModalError] = useState(false);
  const [textError, setTextError] = useState("");

  // const addProduct = useMutation(async () => {

  // });

  const onChange = (e) => {
    const tempForm = { ...form };
    tempForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;

    setForm(tempForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // addProduct.mutate();

    try {
      const body = new FormData();

      body.append("title", title);
      body.append("price", price);
      body.append("image", image);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await API.post("/product", body, config)
        .then((data) => {
          setSuccess(true);
        })
        .catch((error) => {
          if (error.response.status == 400) {
            setModalError(true);
            setTextError(error.response.data.error.message)
          }
        });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-warning">
      <Header />

      {success ? (
        <SweetAlert
          success
          title="Produk berhasil ditambah!"
          onConfirm={() => {
            history.push("/my-products");
          }}
          timeout={2000}
        ></SweetAlert>
      ) : (
        <></>
      )}

      {modalError ? (
        <>
          <SweetAlert
            danger
            title={textError}
            onConfirm={() => setModalError(false)}
            timeout={100000}
          ></SweetAlert>
        </>
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
