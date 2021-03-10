import React, { useState } from "react";
import Header from "../parts/Header";
import Hero from "../parts/Hero";
import CardProductRestaurant from "../components/CardProductRestaurant";
import CardRestaurant from "../components/CardRestaurant";
import { withRouter } from "react-router-dom";

function Landing() {

  return (
    <div className="bg-warning">
      <Header />

      <Hero />

      <div style={{ backgroundColor: "#E5E5E5" }}>
        <div className="container pt-4 pb-4">
          <h3 className="h4">Popular Restaurant</h3>
          <div className="mt-4">
            <div className="row">
              <CardRestaurant
                src="/images/burger-king.png"
                name="Burger King"
              />
              <CardRestaurant src="/images/starbuck.png" name="StarBucks" />
              <CardRestaurant src="/images/kfc.png" name="KFC" />
              <CardRestaurant src="/images/jso.png" name="Jco" />
            </div>
          </div>
        </div>
        <div className="container pt-5 pb-5">
          <h3 className="h4">Restaurant Near You</h3>
          <div className="mt-4">
            <div className="row">

              <CardProductRestaurant
                src="/images/geprek-bensu.png"
                name="Geprek Bensu"
                distance="0,2 KM"
              />
              <CardProductRestaurant
                src="/images/mas-rony.png"
                name="Nasi Goreng Mas Rony"
                distance="0,6 KM"
              />
              <CardProductRestaurant
                src="/images/pecel.png"
                name="Pecel Ayam Prambanan"
                distance="0,6 KM"
              />
              <CardProductRestaurant
                src="/images/kopi.png"
                name="Kopi Kenangan"
                distance="1,6 KM"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Landing);
