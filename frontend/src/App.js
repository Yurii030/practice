import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import devicecontrol from "./pages/Devicecontrol";
import LoginPage from "./pages/LoginPage";
import now from "./pages/Now";
import user from "./pages/User";




function App() {
  return (
  <Router>
    <Switch>
      <Route exact path="/devicecontrol" component={devicecontrol} />
      <Route exact path="/user" component={user} />
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/now" component={now} />
      </Switch>
      </Router>
      );
    }
    export default App;