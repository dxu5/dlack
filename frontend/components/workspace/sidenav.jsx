import React from "react";
import ChannelIndex from "./channel_index.jsx";
import DMIndex from "./dm_index.jsx";
import { Link } from "react-router-dom";

class Sidenav extends React.Component {
  constructor(props) {
    super(props);
    this.handleModal = this.handleModal.bind(this);
  }

  handleModal() {
    this.props.openEditUserModal();
  }

  render() {
    return (
      <div className="nav-col">
        <div className="general-sidebar">
          <Link to="/channels/1">
            <div className="welcome-message">
              <img className="side-logo" src={window.images.dlack} />
              <h1>Welcome</h1>
            </div>
          </Link>

          <h2 className="user-nav-info">
            {this.props.currentUser.username}
            {this.props.currentUser.username === "dlack_demo" ? null : (
              <i
                onClick={this.handleModal}
                className="fas fa-user-edit user-edit"
              ></i>
            )}
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
