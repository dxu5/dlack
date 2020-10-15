import React from "react";
import ChatInfo from "./chat_info.jsx";

class ChatView extends React.Component {
  constructor(props) {
    super(props);
  }

  currentChannel() {
    let selectedChannel = null;
    for (const channel in this.props.channels) {
      if (
        Number(this.props.match.params.channelId) ===
        this.props.channels[channel].id
      ) {
        selectedChannel = this.props.channels[channel];
      }
    }
    return selectedChannel;
  }
  calculateUsers() {
    let count = 0;
    for (let i = 0; i < this.props.userChannels.length; i++) {
      if (
        Number(this.props.match.params.channelId) ===
        this.props.userChannels[i].channel_id
      ) {
        count += 1;
      }
    }
    return count;
  }

  render() {
    return (
      <ChatInfo
        currentChannel={this.currentChannel()}
        numUsers={this.calculateUsers()}
        currentUserId={this.props.currentUser.id}
      />
    );
  }
}

export default ChatView;
