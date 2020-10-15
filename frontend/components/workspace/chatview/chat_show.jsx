import React from "react";

class ChatShow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="show-messages">
        <div className="chat-container">
          <div className="message-list-container">Chat View</div>
        </div>
      </div>
    );
  }
}

export default ChatShow;
