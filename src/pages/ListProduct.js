import React, { useState, useEffect, useReducer, useContext } from "react";
import Fade from "react-reveal/Fade";
import Header from "../components/Header";

import { CountCartContext } from "../context/CountCartContext";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import { formatRupiah } from "../utils/formatRupiah";
import { Button, Col, Row } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { Link } from "react-router-dom";

function RestaurantMenu(props) {
  const [state, dispatch] = useContext(CountCartContext);
  const [idProduct, setIdProduct] = useState(0);

  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
    refetch: productsRefetch,
  } = useQuery(
    "myProductsCache",
    async () => {
      const response = await API.get(`/my-products`);

      return response;
    },
    {
      refetchInterval: 100,
    }
  );

  const [modalConfirmDelete, setModalConfirmDelete] = useState(false);

  const deleteProduct = useMutation(async (id) => {
    const response = await API.delete(`/product/${id}`);
  });

  const handleDeleteProduct = () => {
    deleteProduct.mutate(idProduct);

    setModalConfirmDelete(false);
  };

  const handleConfirmDelete = (id) => {
    setIdProduct(id);
    setModalConfirmDelete(true);
  };

  return (
    // <CountCartContextProvider>
    <div
      style={{
        backgroundColor: "#E5E5E5",
        minHeight: "100vh",
      }}
    >
      <Header />

      <div style={{ backgroundColor: "#E5E5E5" }}>
        {/* {count} */}
        <div className="container pt-5 pb-5">
          <div className="d-flex flex-row-reverse">
            <Link className="btn bg-white" to={`/add-product`}>
              <img
                style={{ width: 30 }}
                src="/images/add-product.png"
                className="mr-2"
              />
              <span>Add Product</span>
            </Link>
          </div>

          <div className="mt-4">
            <div className="row">
              {productsData?.data?.data?.products?.map((food, index) => {
                return (
                  <Fade top delay={400 * index}>
                    <div className="col-3">
                      <div className="card mb-3">
                        <img
                          src={food.image}
                          className="p-2"
                          alt={food.title}
                        />
                        <div className="card-body">
                          <h5
                            className="card-title font-weight-bold"
                            style={{ fontSize: 18, height: 40 }}
                          >
                            {food.title}
                          </h5>
                          <p className="card-text text-danger">
                            {formatRupiah(food.price)}
                          </p>
                          <Row>
                            <Col>
                              <Button
                                type="button"
                                className="btn btn-choco btn-sm btn-block"
                                onClick={() => {}}
                              >
                                Edit
                              </Button>
                            </Col>
                            <Col>
                              <Button
                                type="button"
                                className="btn btn-danger btn-sm btn-block"
                                onClick={() => handleConfirmDelete(food.id)}
                              >
                                Hapus
                              </Button>

                              {modalConfirmDelete ? (
                                <>
                                  <SweetAlert
                                    custom
                                    showCancel
                                    // showCloseButton
                                    confirmBtnText="Yes"
                                    cancelBtnText="No"
                                    confirmBtnBsStyle="danger"
                                    cancelBtnBsStyle="light"
                                    customIcon="https://img.icons8.com/bubbles/500/000000/trash.png"
                                    title="Are You Sure Want To Delete"
                                    onConfirm={() => handleDeleteProduct()}
                                    onCancel={() =>
                                      setModalConfirmDelete(false)
                                    }
                                  ></SweetAlert>
                                </>
                              ) : (
                                <></>
                              )}
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </div>
                  </Fade>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
    // </CountCartContextProvider>
  );
}

export default RestaurantMenu;
