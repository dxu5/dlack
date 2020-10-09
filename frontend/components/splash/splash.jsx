import React from "react";
import { Link } from "react-router-dom";
import HeaderContainer from "./header_container";

class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="splash">
        <HeaderContainer />
        <div className="splash-content">
          <div className="splash-picture">
            {/* <img src={window.images.splashpic} id="splash-illustration" /> */}
          </div>
          <div className="text-col">
            <h1>Welcome to your new HQ</h1>
            <p className="intro">
              Teamwork can be hard, messy, complicated... and still the best way
              to work. Dlack is a place where teamwork thrives - a place where
              people get work done, together
            </p>
            <Link className="signup-button" to="/signup">
              Try Dlack for free
            </Link>
            <button className="demo-button">See the demo</button>
            <p>
              Have an account on Dlack?{" "}
              <Link className="signin-link" to="/signin">
                Sign In
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default Splash;
