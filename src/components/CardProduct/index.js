import React from "react";
import { Button } from "react-bootstrap";
import { formatRupiah } from "../../utils/formatRupiah";

function CardProduct(props) {
  return (
    <div className="card mb-3">
      <img src={props.src} className="p-2" alt={props.name} />
      <div className="card-body">
        <h5 className="card-title" style={{ fontSize: 18, height: 40 }}>
          {props.name}
        </h5>
        <p className="card-text text-danger">{formatRupiah(props.price)}</p>
        <div className="d-flex justify-content-between">
          <Button
            type="button"
            className="btn btn-choco btn-sm"
            onClick={props.onClick}
          >
            Edit
          </Button>
          <Button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={props.onClick}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
