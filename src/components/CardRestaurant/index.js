import React from "react";

function CardRestaurant(props) {
  return (
    <div className="col-3">
      <div className="card mr-4">
        <div className="card-body">
          <div className="row">
            <div className="col-4">
              <img src={props.src} />
            </div>
            <div className="col-8 my-auto">
              <h5 className="pl-2 card-title ">{props.name }</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardRestaurant;
