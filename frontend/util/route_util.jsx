import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

const Auth = ({ component: Component, path, loggedIn, exact }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        let final = !loggedIn ? <Component {...props} /> : <Redirect to="/" />;
        return final;
      }}
    />
  );
};
