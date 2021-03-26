import React, { useState, useEffect, useReducer, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import Header from "../components/Header";
import { Input, Button, Form, Row, Col } from "react-bootstrap";
import ModalMap from "../components/ModalMap";
import { OrderContext } from "../context/OrderContext";
import { formatRupiah } from "../utils/formatRupiah";
import CardTransaction from "../components/CardTransaction";
import { useQuery } from "react-query";
import { API } from "../config/api";

function Profile(props) {
  const [state, dispatch] = useContext(OrderContext);

  const [user, setUser] = useState(null);

  const { data: usersData, loading, error, refetch } = useQuery(
    "userCache",
    async () => {
      const response = await API.get("/check-auth");
      setUser(response.data.data.user);
      // return response;
    }
  );

  const {
    data: transactionData,
    transactionLoading,
    transactionError,
    transactionRefetch,
  } = useQuery("myTransactionCache", async () => {
    const response = await API.get("/my-transactions");
    
    return response
    
  });

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
            {loading ? (
              <p>loading</p>
            ) : (
              <Col>
                <Row>
                  <Col>
                    <h1 className="h3 ">
                      {user?.role == "user" ? "My Profile" : "Profile Partner"}
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
                    <Link
                      to={`/edit-profile`}
                      style={{ textDecoration: "none" }}
                    >
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
                      <span className="text-black font-weight-normal">
                        {user?.fullName}
                      </span>
                    </div>

                    <div className="mt-4">
                      <span className="text-choco font-weight-bold">Email</span>
                    </div>
                    <div>
                      <span className="text-black font-weight-normal">
                        {user?.email}
                      </span>
                    </div>
                    <div className="mt-4">
                      <span className="text-choco font-weight-bold">Phone</span>
                    </div>
                    <div>
                      <span className="text-black font-weight-normal">
                        {user?.phone}
                      </span>
                    </div>
                  </Col>
                </Row>
              </Col>
            )}

            <Col xs={5}>
              <Row>
                <h1 className="h3 ">History Transaction</h1>
              </Row>
              {transactionData?.data?.data?.transactions != null ? (
                transactionData?.data?.data?.transactions.map((transaction) => {
                  return <CardTransaction transaction={transaction} />;
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
