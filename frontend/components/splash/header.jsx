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
        <Link to="/">
          <img className="nav-logo" src={window.images.dlacklogo} />
        </Link>
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
