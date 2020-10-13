import React from "react";

class Sidenav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="nav-col">
        <div className="general-sidebar">
          <h1>Welcome</h1>
          <h2>{this.props.currentUser.username}</h2>
          <button className="nav-logout-button" onClick={this.props.logout}>
            Logout
          </button>
        </div>

        {/* render channels here */}
        {/* render dms here */}
      </div>
    );
  }
}

export default Sidenav;
