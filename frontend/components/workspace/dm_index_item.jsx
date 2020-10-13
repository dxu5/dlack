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
      return <span>{users.length}</span>;
    } else {
      return <span>&#x25CB;</span>;
    }
  }

  selected() {
    return this.props.channel.id === Number(this.props.match.params.channelId)
      ? "selected-channel"
      : "";
  }

  handleTitle() {
    let title = this.formatTitle();
    if (title.length > 25) {
      return (
        <div className="channel-title" id={`${this.selected()}-symbol`}>
          {title.slice(0, 21).concat("...")}
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
      <div className="channel-li" id={selected}>
        <Link to={`/channels/${this.props.channel.id}`}>
          <li>
            <div className="channel-symbol" id={`${selected}-symbol`}>
              {this.handleSymbol()}
            </div>
            {this.handleTitle()}
          </li>
        </Link>
      </div>
    );
  }
}

export default DMIndexItem;
