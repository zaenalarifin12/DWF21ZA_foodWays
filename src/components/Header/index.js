import React, { useState, useContext } from "react";
import Login from "../Login";
import Register from "../Register";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { withRouter } from "react-router";
import Cart from "../Cart";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CLEAR_FOOD, HIDE_MODAL_AUTH_ALL, HIDE_MODAL_LOGIN, LOGOUT, SHOW_MODAL_LOGIN, SHOW_MODAL_REGISTER, HIDE_MODAL_REGISTER } from "../../config/Constants";
import { CountCartContext } from "../../context/CountCartContext";
import { ModalAuthContext } from "../../context/ModalAuthContext";

function Header(props) {
  
  const { dispatch } = useContext(AuthContext);

  const [stateCart, dispatchCart] = useContext(CountCartContext);

  const [stateAuthModal, dispatchAuthModal] = useContext(ModalAuthContext);

  // FUNCTION FOR MODAL AUTH

  const hideModalAll = () => {
    dispatchAuthModal({
      type: HIDE_MODAL_AUTH_ALL
    }) 
  }

  const showModalLogin = () => {
    dispatchAuthModal({
      type: SHOW_MODAL_LOGIN
    }) 
  }

  const hideModalLogin = () => {
    dispatchAuthModal({
      type: HIDE_MODAL_LOGIN
    }) 
  }

  const showModalRegister = () => {
    dispatchAuthModal({
      type: SHOW_MODAL_REGISTER
    }) 
  }

  const hideModalRegister = () => {
    dispatchAuthModal({
      type: HIDE_MODAL_REGISTER
    }) 
  }

  // USER 
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    dispatch({
      type: LOGOUT,
    });

    dispatchCart({
      type: CLEAR_FOOD,
    });

    props.history.push("/");
  };

  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-5">
      <h5 className="my-0 mr-md-auto font-weight-normal">
        <Link to={`/`}>
          <img src="/images/logo.png" />
        </Link>
      </h5>

      {user && user.role != null ? (
        <>
          {user.role == 1 ? (
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
                        <div className="my-2">
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
                    src="/images/profile-img.png"
                    className=""
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
                            to={`/add-product`}
                            className="d-flex  align-items-center"
                            style={{ textDecoration: "none" }}
                          >
                            <img
                              style={{ width: 30 }}
                              src="/images/add-product.png"
                              className="mr-2"
                            />
                            <span className="text-choco font-weight-bold">
                              Add Product
                            </span>
                          </Link>
                        </div>
                        <hr className="border-top" />
                        <div className="my-2">
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
                    src="/images/profile-img.png"
                    className=""
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

          <Button
            className="btn btn-sm btn-choco"
            onClick={showModalLogin}
          >
            Login
          </Button>

          <Login
            show={stateAuthModal.login}
            onHide={hideModalAll}
            showRegister={showModalRegister}
          />
        </>
      )}
    </div>
  );
}

export default withRouter(Header);
