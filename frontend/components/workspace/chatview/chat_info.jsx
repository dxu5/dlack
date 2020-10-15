import React from "react";

class ChatInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  handleTitleType() {
    if (this.props.currentChannel.is_dm) {
      return <i className="fas fa-user-friends channel-type-icon-2"></i>;
    } else if (this.props.currentChannel.is_private) {
      return <i className="fas fa-lock channel-type-icon-2"></i>;
    } else {
      return <div className="channel-type-icon">#</div>;
    }
  }

  render() {
    return (
      <div className="channel-info-header">
        <div className="location-info">
          <h2 className="channel-info-title">
            {this.handleTitleType()}
            {this.props.currentChannel.title}
          </h2>
        </div>
        <div className="channel-people">
          <i className="far fa-user channel-people-icon"></i>
          <div className="channel-members">{this.props.numUsers} Members</div>
        </div>
      </div>
    );
  }
}

export default ChatInfo;
