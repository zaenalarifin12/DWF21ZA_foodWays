import React, { useState, useContext, useEffect } from "react";
import Login from "../Login";
import Register from "../Register";
import { Button, Col, OverlayTrigger, Popover, Row } from "react-bootstrap";
import { useHistory, withRouter } from "react-router";
import Cart from "../Cart";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  CLEAR_FOOD,
  HIDE_MODAL_AUTH_ALL,
  HIDE_MODAL_LOGIN,
  LOGOUT,
  SHOW_MODAL_LOGIN,
  SHOW_MODAL_REGISTER,
  HIDE_MODAL_REGISTER,
  AUTH_ERROR,
} from "../../config/Constants";
import { CountCartContext } from "../../context/CountCartContext";
import { ModalAuthContext } from "../../context/ModalAuthContext";
import { API } from "../../config/api";

function Header(props) {
  const router = useHistory();

  const [user, setUser] = useState(null);

  const [state, dispatch] = useContext(AuthContext);

  const [stateCart, dispatchCart] = useContext(CountCartContext);

  const [stateAuthModal, dispatchAuthModal] = useContext(ModalAuthContext);

  const checkAuth = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 401) {
        dispatch({
          type: AUTH_ERROR,
        });
      }

      setUser(response.data.data.user);
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  // FUNCTION FOR MODAL AUTH

  const hideModalAll = () => {
    dispatchAuthModal({
      type: HIDE_MODAL_AUTH_ALL,
    });
  };

  const showModalLogin = () => {
    dispatchAuthModal({
      type: SHOW_MODAL_LOGIN,
    });
  };

  const hideModalLogin = () => {
    dispatchAuthModal({
      type: HIDE_MODAL_LOGIN,
    });
  };

  const showModalRegister = () => {
    dispatchAuthModal({
      type: SHOW_MODAL_REGISTER,
    });
  };

  const hideModalRegister = () => {
    dispatchAuthModal({
      type: HIDE_MODAL_REGISTER,
    });
  };

  const handleLogout = () => {
    dispatch({
      type: LOGOUT,
    });

    dispatchCart({
      type: CLEAR_FOOD,
    });

    router.push("/");
  };

  return (
    <Row className="bg-warning d-flex flex-column flex-md-row align-items-center py-3 p-0 m-0">
      <Col>
        <span className="my-0 mr-md-auto font-weight-normal">
          {state.isAuthenticated ? (
            <>
              {state.user.role == "partner" ? (
                <Link to={`/transaction`}>
                  <img src="/images/logo.png" width="100" />
                </Link>
              ) : (
                <Link to={`/`}>
                  <img src="/images/logo.png" width="100" />
                </Link>
              )}
            </>
          ) : (
            <Link to={`/`}>
              <img
                src="/images/logo.png"
                style={{
                  maxWidth: 140,
                }}
              />
            </Link>
          )}
        </span>
      </Col>

      <Col className="d-flex justify-content-end">
        {state.isAuthenticated ? (
          <>
            {state.user.role == "customer" ? (
              <>
                <Cart />
                <div>
                  <OverlayTrigger
                    trigger="click"
                    key="bottom"
                    placement="bottom"
                    overlay={
                      <Popover id={`popover-positioned-bottom`}>
                        <Popover.Content>
                          <div className="my-2">
                            <Link
                              to={`/profile`}
                              className="d-flex  align-items-center"
                              style={{ textDecoration: "none" }}
                            >
                              <img
                                style={{ width: 30 }}
                                src="/images/user.png"
                                className="mr-2"
                              />
                              <span className="text-choco font-weight-bold">
                                Profile
                              </span>
                            </Link>
                          </div>
                          <hr className="border-top" />
                          <div className="my-2" style={{ cursor: "pointer" }}>
                            <img
                              style={{ width: 30 }}
                              src="/images/logout.png"
                              className="mr-2"
                            />
                            <a
                              onClick={handleLogout}
                              className="font-weight-bold text-choco"
                            >
                              Logout
                            </a>
                          </div>
                        </Popover.Content>
                      </Popover>
                    }
                  >
                    <img
                      src={user?.image ?? "/images/default.png"}
                      className="rounded-circle"
                      style={{ width: 60, height: 60, objectFit: "cover" }}
                    />
                  </OverlayTrigger>
                </div>
              </>
            ) : (
              <>
                <div>
                  <OverlayTrigger
                    trigger="click"
                    key="bottom"
                    placement="bottom"
                    overlay={
                      <Popover id={`popover-positioned-bottom`}>
                        <Popover.Content>
                          <div className="my-2">
                            <Link
                              to={`/profile`}
                              className="d-flex  align-items-center"
                              style={{ textDecoration: "none" }}
                            >
                              <img
                                style={{ width: 30 }}
                                src="/images/user.png"
                                className="mr-2"
                              />
                              <span className="text-choco font-weight-bold">
                                Profile Partner
                              </span>
                            </Link>
                          </div>
                          <div className="my-2 ">
                            <Link
                              to={`/my-products`}
                              className="d-flex  align-items-center"
                              style={{ textDecoration: "none" }}
                            >
                              <img
                                style={{ width: 30 }}
                                src="/images/add-product.png"
                                className="mr-2"
                              />
                              <span className="text-choco font-weight-bold">
                                List Products
                              </span>
                            </Link>
                          </div>
                          <hr className="border-top" />
                          <div className="my-2" style={{ cursor: "pointer" }}>
                            <img
                              style={{ width: 30 }}
                              src="/images/logout.png"
                              className="mr-2"
                            />
                            <a
                              onClick={handleLogout}
                              className="font-weight-bold text-choco"
                            >
                              Logout
                            </a>
                          </div>
                        </Popover.Content>
                      </Popover>
                    }
                  >
                    <img
                      src={user?.image ?? "/images/default.png"}
                      className="rounded-circle"
                      style={{ width: 60, height: 60, objectFit: "cover" }}
                    />
                  </OverlayTrigger>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <Button
              className="btn btn-sm btn-choco mr-4 "
              onClick={showModalRegister}
            >
              Register
            </Button>

            <Register
              show={stateAuthModal.register}
              onHide={hideModalAll}
              showLogin={showModalLogin}
            />

            <Button className="btn btn-sm btn-choco" onClick={showModalLogin}>
              Login
            </Button>

            <Login
              show={stateAuthModal.login}
              onHide={hideModalAll}
              showRegister={showModalRegister}
            />
          </>
        )}
      </Col>
    </Row>
  );
}

export default withRouter(Header);
