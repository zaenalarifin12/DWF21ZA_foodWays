import React, { createContext } from "react";

const CartContext = React.createContext(0);

export const CartProvider = CartContext.Provider;
export const CartConsumer = CartContext.Consumer;

export default CartContext;
/*

1. inisial context
2. buat state
3. return contect from provider


*/