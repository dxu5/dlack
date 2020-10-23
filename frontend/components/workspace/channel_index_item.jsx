import React from "react";
import { Link } from "react-router-dom";

class ChannelIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleModal = this.handleModal.bind(this);
  }

  handleSymbol() {
    if (this.props.channel.is_private) {
      return <i className="fas fa-lock"></i>;
    } else {
      return "#";
    }
  }

  handleModal() {
    this.props.openDeleteModal();
  }

  renderDelete() {
    if (
      this.props.channel.owner_id === this.props.currentUserId &&
      this.props.channel.title !== "General"
    ) {
      return (
        <div onClick={this.handleModal} className="delete-channel">
          &#10005;
        </div>
      );
    } else {
      return null;
    }
  }

  handleTitle() {
    let title = this.props.channel.title;
    if (title.length > 12) {
      return title.slice(0, 9).concat("...");
    } else {
      return title;
    }
  }

  render() {
    const selected =
      this.props.channel.id === Number(this.props.match.params.channelId)
        ? "selected-channel"
        : "";
    return (
      <div className="channel-li" id={selected}>
        <Link to={`/channels/${this.props.channel.id}`}>
          <li>
            <div className="channel-list-header">
              <div className="channel-symbol" id={`${selected}-symbol`}>
                {this.handleSymbol()}
              </div>
              <div className="channel-title" id={`${selected}-symbol`}>
                {this.handleTitle()}
              </div>
              {this.props.numNotifications === 0 ? null : (
                <div className="numberCircle">
                  {this.props.numNotifications}
                </div>
              )}
            </div>

            {this.renderDelete()}
          </li>
        </Link>
      </div>
    );
  }
}

export default ChannelIndexItem;
