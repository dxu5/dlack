import React from "react";
import SidenavContainer from "./sidenav_container.js";

class Workspace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let channelIds = this.props.channels.map((channel) => {
      return channel.id;
    });
    if (
      channelIds.includes(Number(this.props.match.params.channelId)) === false
    ) {
      this.props.history.push("/");
    }
    this.props.getChannelInfo(this.props.match.params.channelId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.channelId != this.props.match.params.channelId) {
      this.props.getChannelInfo(this.props.match.params.channelId);
    }
  }

  render() {
    return (
      <div className="workspace">
        <SidenavContainer channels={this.props.channels} />
      </div>
    );
  }
}

export default Workspace;
