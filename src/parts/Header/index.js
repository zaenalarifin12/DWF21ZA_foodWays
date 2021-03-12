import React, { useState } from "react";
import Login from "../Login";
import Register from "../Register";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { withRouter } from "react-router";
import Cart from "./../../components/Cart";
import { Link } from "react-router-dom";

function Header(props) {
  const [modalLoginShow, setModalLoginShow] = React.useState(false);
  const [modalRegisterShow, setModalRegisterShow] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    props.history.push("/");
  };

  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-5 mb-3">
      <h5 className="my-0 mr-md-auto font-weight-normal">
        <Link to={`/`}>
        <img src="/images/logo.png" />
        </Link>
        
      </h5>

      {localStorage.getItem("token") != null ? (
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
                      <img
                        style={{ width: 30 }}
                        src="/images/user.png"
                        className="mr-2"
                      />
                      <span className="font-weight-bold">Profile Partner</span>
                    </div>
                    <div className="my-2">
                      <img
                        style={{ width: 30 }}
                        src="/images/add-product.png"
                        className="mr-2"
                      />
                      <span className="font-weight-bold">Add Product</span>
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
                className="img-thumbnail rounded-circle border border-choco bg-choco"
              />
            </OverlayTrigger>
          </div>
        </>
      ) : (
        <>
          <Button
            className="btn btn-sm btn-choco mr-4 "
            onClick={() => setModalRegisterShow(true)}
          >
            Register
          </Button>

          <Register
            show={modalRegisterShow}
            onHide={() => setModalRegisterShow(false)}
          />

          <Button
            className="btn btn-sm btn-choco"
            onClick={() => setModalLoginShow(true)}
          >
            Login
          </Button>

          <Login
            show={modalLoginShow}
            onHide={() => setModalLoginShow(false)}
          />
        </>
      )}
    </div>
  );
}

export default withRouter(Header);
