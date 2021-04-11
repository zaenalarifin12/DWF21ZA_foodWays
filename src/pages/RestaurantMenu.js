import React, { useState, useEffect, useReducer, useContext } from "react";
import { useParams } from "react-router-dom";
import Fade from "react-reveal/Fade";
import Header from "../components/Header";
import CardDetailProductRestaurant from "./../components/CardDetailProductRestaurant";

import { INCREMENT_FOOD } from "../config/Constants";
import restaurantNear from "../data/restaurantNear";
import {
  CountCartContextProvider,
  CountCartContext,
} from "../context/CountCartContext";
import { useQuery } from "react-query";
import { API } from "../config/api";

function RestaurantMenu(props) {
  const [state, dispatch] = useContext(CountCartContext);

  const params = useParams();
  const { id } = params;

  const {
    data: userData,
    loading: userLoading,
    error: userError,
    refetch: userRefetch,
  } = useQuery("userPartnerCache", async () => {
    const response = await API.get(`/user/${id}`);
    return response;
  });

  const { data: productData, loading, error, refetch } = useQuery(
    "productCache",
    async () => {
      const response = await API.get(`/products/${id}`);

      return response;
    }
  );

  return (
    // <CountCartContextProvider>
    <div style={{ backgroundColor: "#E5E5E5", minHeight: "100vh" }}>
      <Header />

      <div>
        {/* {count} */}
        <div className="container pt-5 pb-5">
          <h3 className="h4 font-weight-bold">
            {userData?.data?.data?.user?.fullName}
          </h3>
          <div className="mt-4">
            <div className="row">
              {productData?.data?.data?.products?.map((food, index) => {
                return (
                  <Fade top delay={400 * index}>
                    <div className="col-sm-12 col-lg-3 mb-3">
                      <CardDetailProductRestaurant
                        key={food.id}
                        src={food.image}
                        name={food.title}
                        price={food.price}
                        onClick={() => {
                          dispatch({
                            type: INCREMENT_FOOD,
                            payload: food,
                            name: userData?.data?.data?.user?.fullName,
                            partnerId: userData?.data?.data?.user?.id,
                          });
                        }}
                      />
                    </div>
                  </Fade>
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
