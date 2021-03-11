import React from "react";
import { Button } from "react-bootstrap";

function CardDetailProductRestaurant(props) {
  return (
    <div className="col-3">
      <div className="card mb-3">
        <img src={props.src} className="p-2" alt={props.name} />
        <div className="card-body">
          <h5 className="card-title" style={{ fontSize: 18,height:50 }}>
            {props.name}
          </h5>
          <p className="card-text text-danger">
            Rp. {parseInt(props.price).toLocaleString()}
          </p>
          <Button type="button" className="btn btn-warning btn-sm btn-block">
            Order
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CardDetailProductRestaurant;
