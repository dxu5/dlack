import React from "react";
import Splash from "./splash/splash.jsx";
import { Route, Switch, Redirect } from "react-router-dom";
const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Splash} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
