import React, { useState } from "react";
import Header from "../parts/Header";
import Hero from "../parts/Hero";
import CardProductRestaurant from "../components/CardProductRestaurant";
import CardRestaurant from "../components/CardRestaurant";
import { withRouter, Link } from "react-router-dom";
import { sellers, restaurantNear } from "../data/users";

function Landing() {
  const [sellersList, setSellersList] = useState(sellers);

  const [restaurantNearList, setRestaurantNearList] = useState(restaurantNear);

  
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
                    <CardRestaurant
                      src={seller.image}
                      name={seller.fullname}
                    ></CardRestaurant>
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
              {restaurantNearList.map((seller) => {
                return (
                  <Link
                    key={seller.id}
                    to={`/restaurant/${seller.id}/food`}
                    className="col-3"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <CardProductRestaurant
                      src={seller.image}
                      name={seller.name}
                      distance={seller.distance}
                    />
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
