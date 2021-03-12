import React, { useState, useEffect, useReducer, useContext } from "react";
import { useParams } from "react-router-dom";

import Header from "./../parts/Header";
import CardDetailProductRestaurant from "./../components/CardDetailProductRestaurant";

import { INCREMENT_FOOD } from "../config/Constants";
import { sellers } from "../data/users";
import {
  CountCartContextProvider,
  CountCartContext,
} from "../context/CountCartContext";

function RestaurantMenu(props) {
    const [ state, dispatch ] = useContext(CountCartContext);

  const [seller, setSeller] = useState(null);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    SellerById();
  }, []);

  const SellerById = () => {
    const filterSeller = sellers.find((seller) => seller.id == id);
    setSeller(filterSeller);
  };

  return (
    // <CountCartContextProvider>
      <div className="bg-warning">
        <Header />

        <div style={{ backgroundColor: "#E5E5E5" }}>
          {/* {count} */}
          <div className="container pt-5 pb-5">
            <h3 className="h4">{seller && seller.fullname}</h3>
            <div className="mt-4">
              <div className="row">
                {seller && seller.foods.map((food) => {
                  return (
                    <CardDetailProductRestaurant
                      key={food.id}
                      src={food.image}
                      name={food.name}
                      price={food.price}
                      onClick={() => {
                        dispatch({
                          type: INCREMENT_FOOD,
                          payload: food
                        });
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    // </CountCartContextProvider>
  );
}

export default RestaurantMenu;
