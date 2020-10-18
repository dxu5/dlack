import React from "react";
import MessageIndexItem from "./message_index_item.jsx";
class MessageIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidUpdate() {
  //   this.scrollToBottom();
  // }

  // scrollToBottom() {
  //   this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  // }

  renderMessages() {
    let lastMessage = null;
    return Object.values(this.props.messages)
      .map((message, idx) => {
        if (lastMessage && lastMessage.author_id === message.author_id) {
          let user = this.props.users[message.author_id];
          lastMessage = message;
          return (
            <MessageIndexItem
              user={user}
              message={message}
              key={idx}
              same={true}
            />
          );
        } else {
          let user = this.props.users[message.author_id];
          lastMessage = message;
          return (
            <MessageIndexItem
              user={user}
              message={message}
              key={idx}
              same={false}
            />
          );
        }
      })
      .reverse();
  }

  render() {
    return (
      <div className="message-list-container">{this.renderMessages()}</div>
    );
  }
}

export default MessageIndex;
