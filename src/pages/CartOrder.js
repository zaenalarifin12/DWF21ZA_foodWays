import React, { useState, useEffect, useReducer, useContext } from "react";
import { useParams, Link, Redirect, useHistory } from "react-router-dom";

import Header from "../components/Header";
import { Input, Button, Form, Row, Col } from "react-bootstrap";
import ModalMap from "../components/ModalMap";
import { CountCartContext } from "../context/CountCartContext";
import {
  ADD_ORDER_TRANSACTION,
  DECREMENT_FOOD,
  INCREMENT_FOOD,
  REMOVE_FOOD,
} from "../config/Constants";
import CartEmpty from "../components/EmptyCart";
import SweetAlert from "react-bootstrap-sweetalert";
import { formatRupiah } from "../utils/formatRupiah";
import AddProduct from "./AddProduct";
import { OrderContext } from "../context/OrderContext";

function CartOrder(props) {
  let history = useHistory();

  const [modalMapShow, setModalMapShow] = useState(false);

  const [success, setSuccess] = useState(false);

  const [state, dispatch] = useContext(CountCartContext);
  const [stateOrder, dispatchOrder] = useContext(OrderContext);

  const user = localStorage.getItem("user")

  const handleOrder = () => {
    setSuccess(true);
  };

  function incrementFood(food) {
    dispatch({
      type: INCREMENT_FOOD,
      payload: food,
    });
  }

  function decrementFood(food) {
    dispatch({
      type: DECREMENT_FOOD,
      payload: food,
    });
  }

  const orderProduct = (nameSeller, nameCustomer, address, product_order, alltotal) => {
    dispatchOrder({
      type: ADD_ORDER_TRANSACTION,
      payload: {
        nameSeller: nameSeller,
        nameCustomer: nameCustomer,
        address: address,
        product_order: product_order,
        total: alltotal
      },
    });
    setSuccess(true);

    console.log(state.name)

  };

  return (
    <div className="bg-warning">
      <Header />

      {success ? (
        <SweetAlert
          success
          title="Food was successfully ordered"
          onConfirm={() => {
            history.push("/profile");
          }}
          timeout={2000}
        ></SweetAlert>
      ) : (
        <></>
      )}

      <div
        className="pb-5"
        style={{ backgroundColor: "#E5E5E5", minHeight: "100vh" }}
      >
        {/* {count} */}

        {Object.keys(state.foods).length < 1 ? (
          <CartEmpty />
        ) : (
          <div className="container pt-5 pb-5">
            <h3 className="h4">{state.name}</h3>
            <div className="mt-4">
              <div className="my-2 text-choco h5 font-weight-normal">
                Delivery Location
              </div>
              <div className="">
                <Form>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Control
                          size="lg"
                          className=""
                          type="text"
                          placeholder="location"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={3}>
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
                </Form>
              </div>
              <div>
                <p className="text-choco h5 font-weight-normal">
                  Review Your Code
                </p>
                <Row>
                  <Col>
                    <hr className="border border-bottom border-choco" />
                    {state.foods.map((food) => {
                      return (
                        <>
                          <Row key={food.id}>
                            <Col>
                              <img src={food.image} />
                            </Col>
                            <Col xs={5}>
                              <p className="text-choco my-4 h5 font-weight-colder">
                                {food.name}
                              </p>
                              <Row className="text-choco my-4 h5 font-weight-colder justify-content-start">
                                <Col xs={8}>
                                  <Row>
                                    <Col
                                      xs={2}
                                      className="d-flex justify-content-center"
                                    >
                                      {food.qty > 1 ? (
                                        <span
                                          className="font-weight-bolder h3 text-choco"
                                          onClick={() => decrementFood(food)}
                                          style={{ cursor: "pointer" }}
                                        >
                                          -
                                        </span>
                                      ) : (
                                        <></>
                                      )}
                                    </Col>
                                    <Col className="d-flex justify-content-center align-items-center">
                                      <span className="p-1 px-4 bg-light border border-choco rounded">
                                        {food.qty}
                                      </span>
                                    </Col>
                                    <Col
                                      xs={2}
                                      className="d-flex justify-content-center"
                                    >
                                      <span
                                        className="font-weight-bolder h3 text-choco"
                                        onClick={() => incrementFood(food)}
                                        style={{ cursor: "pointer" }}
                                      >
                                        +
                                      </span>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                            <Col>
                              <Col>
                                <span className="float-right mt-4 mb-2 text-danger">
                                  {formatRupiah(food.total)}
                                </span>{" "}
                              </Col>
                              <Col className="float-right">
                                <Button
                                  className="float-right"
                                  style={{
                                    backgroundColor: "transparent",
                                    borderColor: "transparent",
                                  }}
                                  onClick={() => {
                                    dispatch({
                                      type: REMOVE_FOOD,
                                      payload: food,
                                    });
                                  }}
                                >
                                  <img src="/icons/trash.svg" />
                                </Button>
                              </Col>
                            </Col>
                          </Row>
                          <hr className="border border-bottom border-choco" />
                        </>
                      );
                    })}
                  </Col>
                  <Col xs={4}>
                    <hr className="border border-bottom border-choco" />
                    <div>
                      <Row className="mt-4">
                        <Col>
                          <span className="float-left ">SubTotal</span>
                        </Col>
                        <Col>
                          <span className="float-right text-danger">
                            {formatRupiah(state.subTotalPrice)}
                          </span>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col>
                          <span className="float-left ">Qty</span>
                        </Col>
                        <Col>
                          <span className="float-right">{state.allQty}</span>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col>
                          <span className="float-left">Ongkir</span>
                        </Col>
                        <Col>
                          <span className="float-right text-danger">
                            Rp 10.000
                          </span>
                        </Col>
                      </Row>
                      <hr className="border border-bottom border-choco mt-4" />
                      <Row className="mt-4">
                        <Col>
                          <span className="float-left text-danger font-weight-bolder ">
                            Total
                          </span>
                        </Col>
                        <Col>
                          <span className="float-right text-danger font-weight-bolder">
                            {formatRupiah(
                              parseInt(state.subTotalPrice) + 10000
                            )}
                          </span>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="">
                <Row className="d-flex justify-content-end mt-5">
                  <Col xs={4}>
                    <Button
                      onClick={() =>
                        orderProduct(
                          state.name,
                          user.fullname,
                          "jakarta",
                          state.foods,
                          parseInt(state.subTotalPrice) + 10000
                          
                        )

                      }
                      className="btn btn-choco btn-block"
                    >
                      Order
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartOrder;
