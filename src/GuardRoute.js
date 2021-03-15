import React from "react";
import { Link, Route, Redirect } from "react-router-dom";

const GuardRoute = ({ component: Component, ...rest }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Route
      {...rest}
      render={(props) =>
        user == null || user.role == 1 ? (
          <Component {...props} />
        ) : (
          <Redirect to="/transaction" />
        )
      }
    />
  );
};

export default GuardRoute;
