import React, { useState, useEffect, useReducer, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import Header from "./../parts/Header";
import { Input, Button, Form, Row, Col } from "react-bootstrap";
import ModalMap from "../parts/ModalMap";

// redirect login 
// mapbox
function Transaction(props) {
  const initialState = [
    {
      no: 1,
      name: "sugeng no pants",
      address: "cileungsi",
      product_order: "Paket geprek, mi geprek",
      status: 1, //waiting aprove
    },
    {
      no: 2,
      name: "Adi Susongko",
      address: "cileungsi",
      product_order: "Paket geprek keju",
      status: 3, //success
    },
    {
      no: 3,
      name: "Baskoro",
      address: "cileungsi",
      product_order: "Paket Geprek Leleh",
      status: 2, //cancel
    },
    {
      no: 4,
      name: "Amin Fatah",
      address: "cileungsi",
      product_order: "Mie Ayam Leleh",
      status: 4, //on the way
    },
  ];

  const [transactions, setTransactions] = useState(initialState);

  const handleSuccess = (transactionId) => {
    let update = transactions.map((tr) => 
      tr.no == transactionId ? {...tr, status: 3} : tr
    );

    setTransactions(update)

  };

  const handleCancel = (transactionId) => {
    let update = transactions.map((tr) => 
      tr.no == transactionId ? {...tr, status: 2} : tr
    );

    setTransactions(update)

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
                    {transactions.map((tr) => (
                      <tr>
                        <th>{tr.no}</th>
                        <td>{tr.name}</td>
                        <td>{tr.address}</td>
                        <td>{tr.product_order}</td>

                        {tr.status == 1 ? (
                          <td className="text-warning">Waiting Approve</td>
                        ) : tr.status == 2 ? (
                          <td className="text-danger">Cancel</td>
                        ) : tr.status == 3 ? (
                          <td className="text-success">Success</td>
                        ) : (
                          <td className="text-info">Waiting approve</td>
                        )}

                        {tr.status == 1 ? (
                          <td className="d-flex justify-content-around">
                            <Button
                            onClick={() => handleCancel(tr.no) }
                            className="btn btn-danger btn-sm">
                              Cancel
                            </Button>
                            <Button
                            onClick={() => handleSuccess(tr.no) }
                            className="btn btn-teal btn-sm">
                              Approve
                            </Button>
                          </td>
                        ) : tr.status == 2 ? (
                          <td className="text-center">
                            <img src="/icons/cancel.svg" />
                          </td>
                        ) : tr.status == 3 ? (
                          <td className="text-center">
                            <img src="/icons/success.svg" />
                          </td>
                        ) : (
                          <td className="text-center">
                            <img src="/icons/success.svg" />
                          </td>
                        )}
                      </tr>
                    ))}
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
