import React from "react";
import { Link, Route } from "react-router-dom";
import Login from "./parts/Login";

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
            <Link to="/">
              <Login
                show={modalLoginShow}
                onHide={() => setModalLoginShow(false)}
              />
            </Link>
          </>
        )
      }
    />
  );
};

export default PrivateRoute;
