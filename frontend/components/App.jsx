import React from "react";
import Splash from "./splash/splash.jsx";
import LoginFormContainer from "./forms/login_form_container";
import { Route, Switch, Redirect } from "react-router-dom";
const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={LoginFormContainer} />
        <Route exact path="/" component={Splash} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
