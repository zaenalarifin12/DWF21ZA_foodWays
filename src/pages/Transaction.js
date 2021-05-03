import React, { useState, useEffect, useReducer, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import Header from "../components/Header";
import { Input, Button, Form, Row, Col } from "react-bootstrap";
import ModalMap from "../components/ModalMap";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";

function Transaction(props) {
  const {
    data: transactionData,
    loading: transactionLoading,
    error: transactionError,
    refetch: transactionRefetch,
  } = useQuery(
    "transactionCache",
    async () => {
      const response = await API.get("/my-transactions");

      return response;
    },
    {
      refetchInterval: 1000,
    }
  );

  const approve = useMutation(async (id) => {
    const body = JSON.stringify({
      status: "on the way",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await API.put(`/transaction/${id}`, body, config);
  });

  const cancel = useMutation(async (id) => {
    const body = JSON.stringify({
      status: "cancel",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await API.put(`/transaction/${id}`, body, config);
  });

  const handleApprove = (id) => {
    approve.mutate(id);
  };

  const handleCancel = (id) => {
    cancel.mutate(id);
  };

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
            <Col>
              <Row>
                <Col>
                  <h1 className="h3 my-4">Income Transaction</h1>
                </Col>
              </Row>

              <Row>
                <table class="table table-striped">
                  <thead style={{ backgroundColor: "#f6f6f6" }}>
                    <tr>
                      <th class="text-center">No</th>
                      <th class="text-center">Name</th>
                      <th class="text-center">Address</th>
                      <th class="text-center">product order</th>
                      <th class="text-center">Status</th>
                      <th class="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody style={{ backgroundColor: "white" }}>
                    {transactionData?.data?.data?.transactions.map(
                      (tr, index) => (
                        <tr>
                          <th>{index + 1}</th>
                          <td>{tr.userOrder.fullName}</td>
                          <td>{tr.address}</td>
                          <td>
                            {tr.order.map((order, index2) => {
                              let koma =
                                tr.order.length - 1 != index2 ? " , " : "";

                              return (
                                <p>
                                  {" "}
                                  {order.title} : qty {order.qty} {koma}
                                </p>
                              );
                            })}
                          </td>

                          {tr.status == "waiting approve" ? (
                            <td className="text-warning">Waiting Approve</td>
                          ) : tr.status == "cancel" ? (
                            <td className="text-danger">Cancel</td>
                          ) : tr.status == "success" ? (
                            <td className="text-success">Success</td>
                          ) : (
                            <td className="text-info">On The Way</td>
                          )}

                          {tr.status == "waiting approve" ? (
                            <td className="d-flex justify-content-around">
                              <Button
                                onClick={() => handleCancel(tr.id)}
                                className="btn btn-danger btn-sm mr-4"
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={() => handleApprove(tr.id)}
                                className="btn btn-teal btn-sm"
                              >
                                Approve
                              </Button>
                            </td>
                          ) : tr.status == "cancel" ? (
                            <td className="text-center">
                              <img src="/icons/cancel.svg" />
                            </td>
                          ) : tr.status == "success" ? (
                            <td className="text-center">
                              <img src="/icons/success.svg" />
                            </td>
                          ) : (
                            <td className="text-center">
                              <img src="/icons/success.svg" />
                            </td>
                          )}
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
