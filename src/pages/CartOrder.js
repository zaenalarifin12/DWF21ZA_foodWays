import React, { useState, useEffect, useReducer, useContext } from "react";
import { useParams } from "react-router-dom";

import Header from "./../parts/Header";
import { Input, Button, Form, Row, Col } from "react-bootstrap";
import ModalMap from "../parts/ModalMap";
import { CountCartContext } from "../context/CountCartContext";
import { INCREMENT_FOOD, REMOVE_FOOD } from "../config/Constants";

function CartOrder(props) {
  const [modalMapShow, setModalMapShow] = useState(false);

  const [state, dispatch] = useContext(CountCartContext);

  return (
    // <CountCartContextProvider>
    <div className="bg-warning">
      <Header />

      <div className="pb-5" style={{ backgroundColor: "#E5E5E5" }}>
        {/* {count} */}
        <div className="container pt-5 pb-5">
          <h3 className="h4">Geprek Bensu</h3>
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
                        <Row>
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
                                    <span className="font-weight-bolder h3 text-choco"
                                    style={{cursor: "pointer"}}
                                    >
                                      -
                                    </span>
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
                                    <span className="font-weight-bolder h3 text-choco" onClick={() => {
                                      dispatch({
                                        type: INCREMENT_FOOD,
                                        payload: food
                                      })
                                    }}
                                    style={{cursor: "pointer"}}
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
                                Rp. {parseInt(food.total).toLocaleString()}
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
                          Rp 35.000
                        </span>
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col>
                        <span className="float-left ">Qty</span>
                      </Col>
                      <Col>
                        <span className="float-right">2</span>
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
                  </div>
                </Col>
              </Row>
            </div>
            <div className="">
              <Row className="d-flex justify-content-end mt-5">
                <Col xs={4}>
                  <Button className="btn btn-choco btn-block">Order</Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </CountCartContextProvider>
  );
}

export default CartOrder;
