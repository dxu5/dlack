import React from "react";
import { Link } from "react-router-dom";

class DMIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSymbol() {
    if (this.props.channel.is_private) {
      return <i className="fas fa-lock"></i>;
    } else {
      return "#";
    }
  }

  selected() {
    return this.props.channel.id === Number(this.props.match.params.channelId)
      ? "selected-channel"
      : "";
  }

  handleTitle() {
    if (this.props.channel.title.length > 25) {
      return (
        <div className="channel-title" id={`${this.selected()}-symbol`}>
          {this.props.channel.title.slice(0, 21).concat("...")}
        </div>
      );
    } else {
      return (
        <div className="channel-title" id={`${this.selected()}-symbol`}>
          {this.props.channel.title}
        </div>
      );
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
