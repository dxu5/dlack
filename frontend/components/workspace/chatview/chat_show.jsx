import React from "react";
import MessageIndexContainer from "./message_index_container.js";
import MessageFormContainer from "./message_form_container.js";
class ChatShow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="show-messages">
        <div className="chat-container">
          <MessageIndexContainer />

          <MessageFormContainer />
        </div>
      </div>
    );
  }
}

export default ChatShow;
