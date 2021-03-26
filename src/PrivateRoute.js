import React from "react";
import { Link, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import { createBrowserHistory } from "history";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [modalLoginShow, setModalLoginShow] = React.useState(true);

  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") != null ? (
          <Component {...props} />
        ) : (
          <>
            <Redirect to={`/`} />
          </>
        )
      }
    />
  );
};

export default PrivateRoute;
