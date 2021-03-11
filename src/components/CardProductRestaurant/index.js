import React from "react";

function CardProductRestaurant(props) {
  return (
    <div className="col-3">
      <div className="card ">
        <img src={props.src} className="p-2" alt={props.name } />
        <div className="card-body">
          <h5 className="card-title" style={{ fontSize:18}}>{props.name}</h5>
          <p className="card-text">{props.distance}</p>
        </div>
      </div>
    </div>
  );
}

export default CardProductRestaurant;
