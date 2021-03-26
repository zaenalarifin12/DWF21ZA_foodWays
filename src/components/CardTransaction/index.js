import React from "react";
import { Input, Button, Form, Row, Col } from "react-bootstrap";
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
          <Button
            variant="light"
            className="bg-finish btn text-success font-weight-normal disabled"
          >
            Finished
          </Button>
        </Row>
      </Col>
    </Row>
  );
}

export default CardTransaction;
