import React, { useReducer } from "react";
import {
  INCREMENT_FOOD,
  DECREMENT_FOOD,
  REMOVE_FOOD,
  CLEAR_FOOD,
} from "../config/Constants";

export const CountCartContext = React.createContext();

let nameSeller = localStorage.getItem("name");
let foodList = JSON.parse(localStorage.getItem("cart"));
let countAllQty = localStorage.getItem("allQty");
let countSubTotalPrice = localStorage.getItem("subTotalPrice");
const initialState = {
  name: nameSeller ?? "",
  foods: foodList != null ? foodList : [],
  allQty: countAllQty ?? 0,
  subTotalPrice: countSubTotalPrice ?? 0,
};

const reducer = (state, action) => {
  let payload;

  let food;
  let foodNow;

  switch (action.type) {
    case INCREMENT_FOOD:
      payload = action.payload;

      food = state.foods.find((x) => x.id === payload.id);

      if (food) {
        const updatedFoods = state.foods.map((food) =>
          food.id === payload.id
            ? {
                ...food,
                qty: food.qty + 1,
                total: parseInt(food.price) * (parseInt(food.qty) + 1),
              }
            : food
        );


        let allQty = 0;
        let subTotalPrice = 0;
        // mapping for get all price and all qty
        updatedFoods.map((food) => {
          allQty += food.qty;
          subTotalPrice += food.total;
        });

        let foods = JSON.stringify(updatedFoods);

        localStorage.setItem("cart", foods);
        localStorage.setItem("allQty", allQty);
        localStorage.setItem("subTotalPrice", subTotalPrice);

        return {
          foods: updatedFoods,
          allQty: allQty,
          subTotalPrice: subTotalPrice,
        };
      } else {
        payload = Object.assign(action.payload, {
          qty: 1,
          total: action.payload.price,
        });

        let foods = JSON.stringify([...state.foods, payload]);
        localStorage.removeItem("cart");
        localStorage.setItem("cart", foods);

        let allQty = 0;
        let subTotalPrice = 0;
        // mapping for get all price and all qty
        [...state.foods, payload].map((food) => {
          allQty += food.qty;
          subTotalPrice += food.total;
        });

        let nameSeller = action.name 
        localStorage.setItem("name", nameSeller);

        return {
          name: nameSeller,
          foods: [...state.foods, payload],
          allQty: allQty,
          subTotalPrice: subTotalPrice,
        };
      }

    case DECREMENT_FOOD:
      payload = action.payload;

      food = state.foods.find((x) => x.id === payload.id);

      if (food) {
        const updatedFoods = state.foods.map((food) =>
          food.id === payload.id
            ? {
                ...food,
                qty: food.qty - 1,
                total: food.price * (payload.qty - 1),
              }
            : food
        );

        let allQty = 0;
        let subTotalPrice = 0;
        // mapping for get all price and all qty
        updatedFoods.map((food) => {
          allQty += food.qty;
          subTotalPrice += food.total;
        });

        let foods = JSON.stringify(updatedFoods);

        localStorage.setItem("cart", foods);
        localStorage.setItem("allQty", allQty);
        localStorage.setItem("subTotalPrice", subTotalPrice);

        return {
          foods: updatedFoods,
          allQty: allQty,
          subTotalPrice: subTotalPrice,
        };
      } else {
        return {
          foods: [...state.foods],
          allQty: state.allQty,
          subTotalPrice: state.subTotalPrice,
        };
      }

    case REMOVE_FOOD:
      payload = action.payload;

      let updatedFoods = state.foods.filter((x) => x.id !== payload.id);

      let allQty = 0;
      let subTotalPrice = 0;
      // mapping for get all price and all qty
      updatedFoods.map((food) => {
        allQty += food.qty;
        subTotalPrice += food.total;
      });

      let foods = JSON.stringify(updatedFoods);

      localStorage.setItem("cart", foods);
      localStorage.setItem("allQty", allQty);
      localStorage.setItem("subTotalPrice", subTotalPrice);

      if(Object.keys(updatedFoods).length < 1){
        localStorage.removeItem("name");
      }

      return {
        foods: updatedFoods,
        allQty: allQty,
        subTotalPrice: subTotalPrice,
      };

    case CLEAR_FOOD:
      localStorage.removeItem("name");
      localStorage.removeItem("cart");
      localStorage.removeItem("allQty");
      localStorage.removeItem("subTotalPrice");
      return {
        foods: [],
      };

    default:
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
