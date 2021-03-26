import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import CardProductRestaurant from "../components/CardProductRestaurant";
import CardRestaurant from "../components/CardRestaurant";
import { withRouter, Link } from "react-router-dom";
import sellers from "../data/sellers.json";
import restaurantNear from "../data/restaurantNear.json";
import Fade from "react-reveal/Fade";
import { useQuery } from "react-query";
import { API } from "../config/api";

function Landing() {
  const [sellersList, setSellersList] = useState(sellers);

  const [restaurantNearList, setRestaurantNearList] = useState(restaurantNear);

  const { data: userData, loading, error, refetch } = useQuery(
    "sellerCache",
    async () => {
      const response = await API.get("/users?role=partner");

      return response;
    }
  );

  return (
    <div className="bg-warning">
      <Header />

      <Hero />

      <div style={{ backgroundColor: "#E5E5E5" }}>
        <div className="container pt-4 pb-4">
          <h3 className="h4">Popular Restaurant</h3>
          <div className="mt-4">
            <div className="row">
              {sellersList.map((seller) => {
                return (
                  <Link
                    key={seller.id}
                    to={`#`}
                    className="col-3"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Fade left delay={500 * seller.id}>
                      <CardRestaurant
                        src={seller.image}
                        name={seller.fullname}
                      ></CardRestaurant>
                    </Fade>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div className="container pt-5 pb-5">
          <h3 className="h4">Restaurant Near You</h3>
          <div className="mt-4">
            <div className="row">
              {userData?.data?.data?.users?.map((user, index) => {
                return (
                  <Link
                    key={user.id}
                    to={`/restaurant/${user.id}/food`}
                    className="col-3"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Fade bottom delay={500 * index}>
                      <CardProductRestaurant
                        src={user.image}
                        name={user.fullName}
                        distance={55}
                      />
                    </Fade>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Landing);
