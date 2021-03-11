import React from "react";
import { CartProvider } from "./../../context/CartContext";

function Cart() {

    

    return (
        <div className="mr-4">
            <span>
              <img src="/images/cart.png" />
              <span class="badge badge-danger">1</span>
            </span>
          </div>
    )
}

export default Cart;