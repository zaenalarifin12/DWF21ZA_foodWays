import React, { useState, useEffect } from "react";
import Header from "./../parts/Header";
import { useParams } from "react-router-dom";
import CardDetailProductRestaurant from "./../components/CardDetailProductRestaurant";
import { sellers } from "../data/users";

function RestaurantMenu(props) {
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
    <div className="bg-warning">
      <Header />

      <div style={{ backgroundColor: "#E5E5E5" }}>
        <div className="container pt-5 pb-5">
          <h3 className="h4">{seller && seller.fullname}</h3>
          <div className="mt-4">
            <div className="row">
              {seller &&
                seller.foods.map((food) => {
                  return (
                    <CardDetailProductRestaurant
                      key={food.id}
                      src={food.image}
                      name={food.name}
                      price={food.price}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantMenu;
