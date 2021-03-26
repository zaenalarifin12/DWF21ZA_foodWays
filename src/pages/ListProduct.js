import React, { useState, useEffect, useReducer, useContext } from "react";
import { useParams } from "react-router-dom";
import Fade from "react-reveal/Fade"
import Header from "../components/Header";
import CardProduct from "./../components/CardProduct";

import { INCREMENT_FOOD } from "../config/Constants";
import restaurantNear from "../data/restaurantNear";
import {
  CountCartContextProvider,
  CountCartContext,
} from "../context/CountCartContext";

function ListProduct(props) {
  const [state, dispatch] = useContext(CountCartContext);

  const [restaurantNearList, setRestaurantNearList] = useState(null);

  
  const id = 1;

  useEffect(() => {
    RestaurantById();
  }, []);

  const RestaurantById = () => {
    const filterRestaurant = restaurantNear.find(
      (restaurant) => restaurant.id == id
    );
    setRestaurantNearList(filterRestaurant);
  };

  return (
    // <CountCartContextProvider>
    <div className="bg-warning">
      <Header />

      <div style={{ backgroundColor: "#E5E5E5" }}>
        {/* {count} */}
        <div className="container pt-5 pb-5">
          <h3 className="h4">
            {restaurantNearList != null ? restaurantNearList.name : ""}
          </h3>
          <div className="mt-4">
            <div className="row">
              {restaurantNearList != null ? (
                restaurantNearList.foods.map((food) => {
                  return (
                    <Fade top delay={400 * food.id}>
                      <div className="col-3">

                      
                      <CardProduct
                        key={food.id}
                        src={food.image}
                        name={food.name}
                        price={food.price}
                        onClick={() => {
                        //   dispatch({
                        //     type: INCREMENT_FOOD,
                        //     payload: food,
                        //     name: restaurantNearList.name,
                        //   });
                        }}
                      />
                      </div>
                    </Fade>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    // </CountCartContextProvider>
  );
}

export default ListProduct;
