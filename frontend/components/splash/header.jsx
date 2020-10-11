import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  getStartedButton() {
    if (this.props.currentUser === undefined) {
      return (
        <Link className="signup-button" to="/signup">
          Start Chatting
        </Link>
      );
    } else {
      return "";
    }
  }

  render() {
    return (
      <nav className="splash-nav">
        <div className="logo-icons">
          <Link to="/">
            <img className="nav-logo" src={window.images.dlacklogo} />
          </Link>
          <div id="class-icons" className="nav-icons">
            <a
              target="_blank"
              href="https://www.linkedin.com/in/derek-jinxiao-xu/"
              className="home-nav-icons"
            >
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
            <a
              href="https://dxu5.github.io/"
              target="_blank"
              className="home-nav-icons"
            >
              <i className="fas fa-user-alt fa-2x"></i>
            </a>
            <a
              href="https://github.com/dxu5"
              target="_blank"
              className="home-nav-icons"
            >
              <i className="fab fa-github fa-2x"></i>
            </a>
          </div>
        </div>

        <div className="signup-login">
          <Link
            className="login-button"
            to="/login"
            hidden={!!this.props.currentUser}
          >
            Sign In
          </Link>
          {this.getStartedButton()}

          <Link
            className="workspace-button"
            to="/"
            hidden={!this.props.currentUser}
          >
            Check Out Your Workspace
          </Link>
          <button
            className="logout-button"
            onClick={this.props.logout}
            hidden={!this.props.currentUser}
          >
            Logout
          </button>
        </div>
      </nav>
    );
  }
}

export default Header;
