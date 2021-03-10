import React from "react";
import "./assets/scss/style.scss";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Landing />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
