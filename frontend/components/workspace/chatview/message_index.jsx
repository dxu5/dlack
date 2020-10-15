import React from "react";
import MessageIndexItem from "./message_index_item.jsx";
class MessageIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  renderMessages() {
    return Object.values(this.props.messages).map((message) => {
      let user = this.props.users[message.author_id];
      return <MessageIndexItem user={user} messaage={message} />;
    });
  }

  render() {
    return (
      <div className="message-list-container">{this.renderMessages()}</div>
    );
  }
}

export default MessageIndex;
