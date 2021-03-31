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

  const [restaurantNearList, setRestaurantNearList] = useState([]);

  const {
    data: userData,
    loading: userLoading,
    error: userError,
    refetch: userRefetch,
  } = useQuery("sellerCache", async () => {
    const response = await API.get("/users?role=partner");

    const responseProduct = await Promise.all(
      response?.data?.data?.users?.map(async (user) => {
        const responseProductDetail = await API.get(`/product-last/${user.id}`);

        return responseProductDetail;
      })
    );

    return { user: response, product: responseProduct };
  });

  return (
    <div  style={{ backgroundColor: "#E5E5E5" }}>
      <Header />

      <Hero />

      <div>
        <div className="container pt-4 pb-4">
          <h3 className="h4">Popular Restaurant</h3>
          <div className="mt-4">
            <div className="row">
              {userData?.user?.data?.data?.users?.map((user, index) => {
                return (
                  <Link
                    key={user.id}
                    to={`#`}
                    className="col-3"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Fade left delay={500 * index}>
                      <CardRestaurant
                        src={user.image}
                        name={user.fullName}
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
              {userData?.product?.map((product, index) => {
                if (product.data.data.product != null) {
                  return (
                    <Link
                      key={product.data.data.product.user.id}
                      to={`/restaurant/${product.data.data.product.user.id}/food`}
                      className="col-3"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <Fade bottom delay={500 * index}>
                        <CardProductRestaurant
                          src={product.data.data.product.image}
                          name={product.data.data.product.title}
                          distance={(index + 1) * 2}
                        />
                      </Fade>
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Landing);
