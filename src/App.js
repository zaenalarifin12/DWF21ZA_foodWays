import React from "react";
import "./assets/scss/style.scss";
import Landing from "./pages/Landing";
import RestaurantMenu from "./pages/RestaurantMenu";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import Login from "./parts/Login";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Landing} />
          <PrivateRoute
            path="/restaurant/:id/food"
            component={RestaurantMenu}
          />
        </Switch>
      </Router>
    </div>
  );
}

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

export default App;
