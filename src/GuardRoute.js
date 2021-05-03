import React, { useEffect, useState, useContext } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import { API } from "./config/api";
import { AuthContext } from "./context/AuthContext";

const GuardRoute = ({ component: Component, ...rest }) => {
  // const [user, setUser] = useState(null);

  // const checkAuth = async () => {
  //   try {
  //     const response = await API.get("/check-auth");
  //     setUser(response.data.data.user);
  //   } catch (error) {}
  // };

  const [state, dispatch] = useContext(AuthContext);

  // useEffect(() => {
  //   checkAuth()
  // }, [])

  return (
    <Route
      {...rest}
      render={
        (props) => (
          // state?.user?.role == "partner" ? (
          <Component {...props} />
        )
        // ) : (
        //   <Redirect to="/" />
        // )
      }
    />
  );
};

export default GuardRoute;
