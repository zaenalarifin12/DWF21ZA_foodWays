import React, { useState, useContext } from "react";
import { CountCartContext } from "../../context/CountCartContext";
import { Link } from "react-router-dom";

function Cart() {
  const [state, dispatch] = useContext(CountCartContext);

  return (
    <div className="mr-4">
      <Link to={`/cart-order`}>
        <img src="/images/cart.png" />

        {state.allQty > 0 ? (
          <span class="badge badge-danger">
            {state.allQty}
          </span>
        ) : (
          <></>
        )}
      </Link>
    </div>
  );
}

export default Cart;
