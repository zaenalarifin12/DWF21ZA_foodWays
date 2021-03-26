import React, { useEffect, useState } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import { API } from "./config/api";

const GuardRoute = ({ component: Component, ...rest }) => {
  // const [user, setUser] = useState(null);

  // const checkAuth = async () => {
  //   try {
  //     const response = await API.get("/check-auth");
  //     setUser(response.data.data.user);
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   checkAuth()
  // }, [])

  return (
    <Route
      {...rest}
      render={(props) =>
        // user == null || user?.role == "customer" ? (
          <Component {...props} />
        // ) : (
        //   <Redirect to="/transaction" />
        // )
      }
    />
  );
};

export default GuardRoute;
