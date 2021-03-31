import React, { useState, useEffect, useRef, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { CountCartContextProvider } from "./context/CountCartContext";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import { OrderContextProvider } from "./context/OrderContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "./assets/scss/style.scss";

import PrivateRoute from "./PrivateRoute";

// component
import Landing from "./pages/Landing";
import RestaurantMenu from "./pages/RestaurantMenu";
import CartOrder from "./pages/CartOrder";
import Map from "./components/Map";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import AddProduct from "./pages/AddProduct";
import Transaction from "./pages/Transaction";
import ListProduct from "./pages/ListProduct";

//
import { ModalAuthContextProvider } from "./context/ModalAuthContext";
import GuardRoute from "./GuardRoute";

import "mapbox-gl/dist/mapbox-gl.css";
import { API, setAuthToken } from "./config/api";
import { AUTH_ERROR, LOGIN } from "./config/Constants";
import { MapContextProvider } from "./context/MapContext";
// init token setiap aplikasi di refresh
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const [state, dispatch] = useContext(AuthContext);

  const checkAuth = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 401) {
        return dispatch({
          type: AUTH_ERROR,
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      dispatch({
        type: LOGIN,
        payload: payload,
      });
    } catch (error) {
      return dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <ModalAuthContextProvider>
        <CountCartContextProvider>
          <OrderContextProvider>
            <MapContextProvider>
              <div>
                <Router>
                  <Switch>
                    <GuardRoute path="/" exact component={Landing} />
                    <GuardRoute
                      path="/transaction"
                      exact
                      component={Transaction}
                    />

                    <PrivateRoute
                      path="/restaurant/:id/food"
                      component={RestaurantMenu}
                    />
                    <PrivateRoute path="/cart-order" component={CartOrder} />
                    {/* <PrivateRoute path="/map" component={Map} /> */}
                    <PrivateRoute path="/profile" component={Profile} />
                    <PrivateRoute
                      path="/edit-profile"
                      component={EditProfile}
                    />
                    <PrivateRoute path="/products" component={ListProduct} />
                    <PrivateRoute path="/add-product" component={AddProduct} />
                    <PrivateRoute path="/my-products" component={ListProduct} />
                    <PrivateRoute path="/transaction" component={Transaction} />
                  </Switch>
                </Router>
              </div>
            </MapContextProvider>
          </OrderContextProvider>
        </CountCartContextProvider>
      </ModalAuthContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
