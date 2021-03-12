import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { CountCartContextProvider } from "./context/CountCartContext";

import "./assets/scss/style.scss";

import PrivateRoute from "./PrivateRoute";

import Landing from "./pages/Landing";
import RestaurantMenu from "./pages/RestaurantMenu";
import CartOrder from "./pages/CartOrder";
import Map from "./parts/Map";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import AddProduct from "./pages/AddProduct";
import Transaction from "./pages/Transaction";

function App() {
  return (
    <CountCartContextProvider>
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={Landing} />
            <PrivateRoute
              path="/restaurant/:id/food"
              component={RestaurantMenu}
            />
            <PrivateRoute path="/cart-order" component={CartOrder} />
            {/* <PrivateRoute path="/map" component={Map} /> */}
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/edit-profile" component={EditProfile} />
            <PrivateRoute path="/add-product" component={AddProduct} />
            <PrivateRoute path="/transaction" component={Transaction} />
          </Switch>
        </Router>
      </div>
    </CountCartContextProvider>
  );
}

export default App;
