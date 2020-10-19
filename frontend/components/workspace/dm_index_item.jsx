import React from "react";
import { Link } from "react-router-dom";

class DMIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSymbol() {
    let title = this.formatTitle();
    let users = title.split(", ");
    if (users.length > 1) {
      return (
        <span id={`${this.selected()}-symbol`} className="dm-square">
          {users.length}
        </span>
      );
    } else {
      return <i className="fas fa-circle dm-circle"></i>;
    }
  }

  selected() {
    return this.props.channel.id === Number(this.props.match.params.channelId)
      ? "selected-dm"
      : "";
  }

  handleTitle() {
    let title = this.formatTitle();
    if (title.length > 15) {
      return (
        <div className="channel-title" id={`${this.selected()}-symbol`}>
          {title.slice(0, 12).concat("...")}
        </div>
      );
    } else {
      return (
        <div className="channel-title" id={`${this.selected()}-symbol`}>
          {title}
        </div>
      );
    }
  }

  formatTitle() {
    let newTitle = [];
    let oldTitle = this.props.channel.title.split(", ");
    for (let i = 0; i < oldTitle.length; i++) {
      if (oldTitle[i] != this.props.currentUser.username) {
        newTitle.push(oldTitle[i]);
      }
    }
    return newTitle.join(", ");
  }

  render() {
    const selected =
      this.props.channel.id === Number(this.props.match.params.channelId)
        ? "selected-channel"
        : "";
    return (
      <div className="dm-li" id={selected}>
        <Link to={`/channels/${this.props.channel.id}`}>
          <li>
            {this.handleSymbol()}
            {this.handleTitle()}
            {this.props.numNotifications === 0 ? null : (
              <div className="numberCircle">{this.props.numNotifications}</div>
            )}
          </li>
        </Link>
      </div>
    );
  }
}

export default DMIndexItem;
