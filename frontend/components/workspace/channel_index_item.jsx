import React from "react";
import { Link } from "react-router-dom";

class ChannelIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSymbol() {
    if (this.props.channel.is_private) {
      return <div>&#128274;</div>;
    } else {
      return "#";
    }
  }

  render() {
    return (
      <Link to={`/channels/${this.props.channel.id}`}>
        <div>
          <li>
            <div>{this.handleSymbol()}</div>
            <div>{this.props.channel.title}</div>
          </li>
        </div>
      </Link>
    );
  }
}

export default ChannelIndexItem;
