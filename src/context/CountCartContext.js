import React, { useReducer } from "react";
import {
  INCREMENT_FOOD,
  DECREMENT_FOOD,
  REMOVE_FOOD,
} from "../config/Constants";

export const CountCartContext = React.createContext();

let foodList = JSON.parse(localStorage.getItem("cart"));
const initialState = {
  foods: foodList != null ? foodList : [],
  //   loading: false,
  //   error: null,
};

const reducer = (state, action) => {
  let payload;

  let food;
  let foodNow;

  switch (action.type) {
    case INCREMENT_FOOD:
      payload = action.payload;

      food = state.foods.find((x) => x.id === payload.id);
      foodNow = state.foods.filter((x) => x.id !== payload.id);

      if (food) {
        payload.qty += 1;
        payload.total = food.price * payload.qty;

        let foods = JSON.stringify([...foodNow, payload]);
        localStorage.removeItem("cart");
        localStorage.setItem("cart", foods);

        return { foods: [...foodNow, payload] };
      } else {
        payload = Object.assign(action.payload, {
          qty: 1,
          total: action.payload.price,
        });

        let foods = JSON.stringify([...state.foods, payload]);
        localStorage.removeItem("cart");
        localStorage.setItem("cart", foods);
        return {
          foods: [...state.foods, payload],
        };
      }

    // console.log(foodList);

    case REMOVE_FOOD:
      payload = action.payload;
      food = state.foods.find((x) => x.id === payload.id);
      foodNow = state.foods.filter((x) => x.id !== payload.id);

      // if (food) {
      //   let foods = JSON.stringify([...foodNow]);
      //   localStorage.removeItem("cart");
      //   localStorage.setItem("cart", foods);

        return { foods: [...foodNow] };
      // }

    default:
      // return state.foods;
      throw new Error();
  }
};

export const CountCartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CountCartContext.Provider value={[state, dispatch]}>
      {children}
    </CountCartContext.Provider>
  );
};

// export function CountCartProvider({ children }) {
//   const foodCart = useReducer(CountCartReducer, []);

//   return (
//     <CountCartContext.Provider value={foodCart}>
//       {children}
//     </CountCartContext.Provider>
//   );
// }

// export const useCountCart = () => {
//   const CountCartValue = useContext(CountCartContext);
//   return CountCartValue;
// };
