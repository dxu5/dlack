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
  calculateUsers() {
    return this.props.userChannels.length;
  }

  render() {
    return (
      <ChatInfo
        currentChannel={this.currentChannel()}
        numUsers={this.calculateUsers()}
      />
    );
  }
}

export default ChatView;
