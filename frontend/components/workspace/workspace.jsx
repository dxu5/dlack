import React from "react";
import SidenavContainer from "./sidenav_container.js";
import ChatViewContainer from "./chatview/chat_view_container.js";

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
      this.props.history.push("/channels/1");
    }
    this.props.getChannelInfo(this.props.match.params.channelId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.channelId != this.props.match.params.channelId) {
      this.props.getChannelInfo(this.props.match.params.channelId);
    }
    let channelIds = this.props.channels.map((channel) => {
      return channel.id;
    });
    if (
      channelIds.includes(Number(this.props.match.params.channelId)) === false
    ) {
      this.props.history.push("/channels/1");
    }
  }

  render() {
    return (
      <div className="workspace">
        <SidenavContainer channels={this.props.channels} />
        <ChatViewContainer channels={this.props.channels} />
      </div>
    );
  }
}

export default Workspace;
