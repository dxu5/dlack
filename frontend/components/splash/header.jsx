import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="splash-nav">
        <Link to="/">
          <img src="" alt="" />
        </Link>
        <div className="signup-login">
          <Link
            className="login-button"
            to="/login"
            hidden={!!this.props.currentUser}
          >
            Sign In
          </Link>
          <Link
            className="signup-button"
            to="/signup"
            hidden={!!this.props.currentUser}
          >
            Start Chatting
          </Link>

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
