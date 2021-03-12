import React, { useState, useContext } from "react";
import { CountCartContext } from "../../context/CountCartContext";
import { Link } from "react-router-dom";

function Cart() {
  const [state, dispatch] = useContext(CountCartContext);

  return (
    <div className="mr-4">
      <Link to={`/cart-order`}>
        <img src="/images/cart.png" />
        <span class="badge badge-danger">
          {Object.keys(state.foods).length}
        </span>
      </Link>
    </div>
  );
}

export default Cart;
