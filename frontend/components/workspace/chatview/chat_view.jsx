import React from "react";
import ChatInfo from "./chat_info.jsx";

class ChatView extends React.Component {
  constructor(props) {
    super(props);
  }

  currentChannel() {
    let selectedChannel = null;
    for (const channel in this.props.channels) {
      if (this.props.match.channelId === channel.id) {
        selectedChannel = channel;
      }
    }
    return selectedChannel;
  }

  render() {
    return (
      <ChatInfo
        channels={this.props.channels}
        userChannels={this.props.userChannels}
        currentChannelId={this.props.match.params.channelId}
      />
    );
  }
}

export default ChatView;
