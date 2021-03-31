import React from "react";
import { Input, Button, Form, Row, Col } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { formatRupiah } from "../../utils/formatRupiah";

function CardTransaction({ transaction }) {
  return (
    <Row className="bg-white p-2 rounded my-2">
      <Col xs={8}>
        <div>
          <span className="h5">{transaction.userOrder.fullName}</span>
        </div>
        <div>
          <span className="h6 font-weight-normal">{transaction.createdAt}</span>
        </div>
        <div className="mt-4">
          <span className="font-weight-bold" style={{ color: "#974A4A" }}>
            Total : {formatRupiah(transaction.total)}
          </span>
        </div>
      </Col>
      <Col>
        <Row className="d-flex justify-content-end">
          <img src="/images/logo.png" />
        </Row>
        <Row className="mt-4 d-flex justify-content-end ">
          {transaction.status == "waiting approve" ? (
            <Button
              variant="light"
              className=" btn bg-warning text-white font-weight-normal"
              style={{cursor: "context-menu"}}
            >
              Waiting Approve
            </Button>
          ) : transaction.status == "cancel" ? (
            <Button
              variant="light"
              className="btn bg-danger text-white font-weight-normal"
              style={{cursor: "context-menu"}}
            >
              Cancel
            </Button>
          ) : transaction.status == "success" ? (
            <Button
              variant="light"
              className="btn bg-success text-white font-weight-normal"
              style={{cursor: "context-menu"}}
            >
              Success
            </Button>
          ) : (
            <Button
              variant="light"
              className="btn bg-teal text-white font-weight-normal"
              style={{cursor: "context-menu"}}
            >
              On The Way
            </Button>
          )}
        </Row>
      </Col>
    </Row>
  );
}

export default CardTransaction;
