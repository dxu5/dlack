import React from "react";
import { Link, Redirect } from "react-router-dom";
import HeaderContainer from "./header_container";
import SplashInfo from "./spashinfo.jsx";

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.redirectDemo = this.redirectDemo.bind(this);
  }

  redirectDemo(e) {
    e.preventDefault();
    this.props.history.push({
      pathname: "/login",
      state: { demo: true },
    });
  }

  render() {
    return (
      <div className="splash">
        <HeaderContainer />
        <div className="splash-content">
          <div className="text-col">
            <h1>Welcome to your new HQ</h1>
            <p className="intro">
              Teamwork can be hard, messy, complicated... and still the best way
              to work. Dlack is where teamwork thrives - a place where people
              get work done. Together.
            </p>
            <Link className="signup-button" to="/signup">
              Try Dlack for free
            </Link>
            <button className="demo-button" onClick={this.redirectDemo}>
              See the demo
            </button>
            <p>
              Have an account on Dlack?{" "}
              <Link className="signup-alt" to="/login">
                Sign In
              </Link>
              .
            </p>
          </div>
          <div className="splash-picture-col">
            <video
              id="splash-illustration"
              src={window.images.splashvideo}
              autoPlay
              loop
              muted
            />
          </div>
        </div>
        <SplashInfo />
      </div>
    );
  }
}
export default Splash;
