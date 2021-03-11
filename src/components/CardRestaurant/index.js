import React from "react";

function CardRestaurant(props) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-4">
            <img src={props.src} alt={props.name} />
          </div>
          <div className="col-8 my-auto">
            <h5 className="pl-2 card-title text-dark ">{props.name}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardRestaurant;
