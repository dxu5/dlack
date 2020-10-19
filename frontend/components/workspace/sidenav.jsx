import React from "react";
import ChannelIndex from "./channel_index.jsx";
import DMIndex from "./dm_index.jsx";

class Sidenav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="nav-col">
        <div className="general-sidebar">
          <div className="welcome-message">
            <img className="side-logo" src={window.images.dlack} />
            <h1>Welcome</h1>
          </div>

          <h2 className="user-nav-info">
            {this.props.currentUser.username}
            <i className="fas fa-user-edit user-edit"></i>
          </h2>
          <div className="nav-logout-button" onClick={this.props.logout}>
            Sign Out of Dlack
          </div>
        </div>

        <ChannelIndex channels={this.props.channels} />
        <DMIndex channels={this.props.channels} />
      </div>
    );
  }
}

export default Sidenav;
