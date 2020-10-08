import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    <nav className="splash-nav">
      <Link to="/">
        <img src="" alt="" />
      </Link>
      <div>
        <Link className="" to="/login" hidden={!!this.props.currentUser}>
          Sign In
        </Link>
        <Link className="" to="/signup" hidden={!!this.props.currentUser}>
          Start Chatting
        </Link>

        <Link className="" to="/" hidden={!this.props.currentUser}>
          Check Out Workspace
        </Link>
        <button onClick={this.props.logout} hidden={!this.props.currentUser}>
          Logout
        </button>
      </div>
    </nav>;
  }
}

export default Header;
