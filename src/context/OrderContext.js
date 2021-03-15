import React, { useReducer } from "react";
import { ADD_ORDER_TRANSACTION } from "../config/Constants";
export const OrderContext = React.createContext();

const initialState = {
  transaction: [
    {
        id: Math.random().toString(36).substring(7),
        nameSeller: "Geprek Bensu",
        nameCustomer: "Adi",
        address: "Jakarta",
        date: "Mon, 15 Mar 2021 01:00:29 GMT",
        product_order: [{
            id: 11,
            name: "Paket Geprek",
            image: "/images/bensu/paket-geprek.png",
            price: 15000,
          },
          {
            id: 21,
            image: "/images/bensu/paket-geprek-keju.png",
            name: "Paket Geprek Keju",
            price: 20000,
          },],
        total: 140000,
        status: 1,
      }
  ],
};

/*
 * waiting , on the way, success cancel
 */

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_ORDER_TRANSACTION:
      let today = new Date();
      // let add_transaction = {
      //   id: Math.random().toString(36).substring(7),
      //   nameSeller: action.payload.nameSeller,
      //   nameCustomer: action.payload.nameCustomer,
      //   address: action.payload.address,
      //   date: new Date(today).toUTCString(),
      //   product_order: [action.payload.product_order],
      //   total: action.payload.total,
      //   status: 1,
      // };

      return {
        transaction: state.transaction,
      };

    default:
      throw new Error();
  }
};

export const OrderContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <OrderContext.Provider value={[state, dispatch]}>
      {children}
    </OrderContext.Provider>
  );
};
