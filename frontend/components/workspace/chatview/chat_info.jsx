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

  renderButton() {
    if (
      this.props.currentUserId === this.props.currentChannel.owner_id &&
      !this.props.currentChannel.is_dm &&
      this.props.currentChannel.title !== "General"
    ) {
      return (
        <div className="edit-channel-button">
          <i className="fas fa-edit"></i>
          <span>Edit Channel</span>
        </div>
      );
    } else {
      return null;
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
        <div className="right-channel-header">
          <div className="channel-people">
            <i className="far fa-user channel-people-icon"></i>
            <div className="channel-members">{this.props.numUsers} Members</div>
          </div>
          {this.renderButton()}
        </div>
      </div>
    );
  }
}

export default ChatInfo;
