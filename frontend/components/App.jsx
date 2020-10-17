import React from "react";
import Splash from "./splash/splash.jsx";
import LoginFormContainer from "./forms/login_form_container";
import SignupFormContainer from "./forms/signup_form_container.js";
import WorkspaceContainer from "./workspace/workspace_container.js";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util.jsx";
import ListenerContainer from "./listener_container.js";
import ChannelListenerContainer from "./channel_listener_container.js";
const App = () => {
  return (
    <div>
      <ListenerContainer />
      <ChannelListenerContainer />
      <Switch>
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
        <ProtectedRoute
          exact
          path="/channels/:channelId"
          component={WorkspaceContainer}
        />
        <Route exact path="/" component={Splash} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
