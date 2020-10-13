import React from "react";
import { Link } from "react-router-dom";

class ChannelIndexItem extends React.Component {
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
            <div className="channel-title" id={`${selected}-symbol`}>
              {this.props.channel.title}
            </div>
          </li>
        </Link>
      </div>
    );
  }
}

export default ChannelIndexItem;
