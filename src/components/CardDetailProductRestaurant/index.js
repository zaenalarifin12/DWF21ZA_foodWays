import React from "react";
import { Button } from "react-bootstrap";
import { formatRupiah } from "../../utils/formatRupiah";

function CardDetailProductRestaurant(props) {
  return (
    
      <div className="card mb-3">
        <img src={props.src} className="p-2" alt={props.name} />
        <div className="card-body">
          <h5 className="card-title font-weight-bold" style={{ fontSize: 18,height:40 }}>
            {props.name}
          </h5>
          <p className="card-text text-danger">
            {
            formatRupiah(props.price)}
          </p>
          <Button type="button" className="btn btn-warning btn-sm btn-block"
          onClick={props.onClick}
          >
            Order
          </Button>
        </div>
    
    </div>
  );
}

export default CardDetailProductRestaurant;
