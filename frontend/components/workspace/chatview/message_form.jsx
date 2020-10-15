import React from "react";

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      channel_id: Number(this.props.match.params.channelId),
    };
  }

  determineType() {
    if (this.props.currentChannel.is_private) {
      return (
        <input
          type="text"
          placeholder={`Message 🔒 ${this.props.currentChannel.title}`}
          style={{ fontFamily: "Poppins, FontAwesome" }}
          value={this.state.body}
          className="message-text"
        />
      );
    } else {
      return (
        <input
          type="text"
          placeholder={`Message  # ${this.props.currentChannel.title}`}
          value={this.state.body}
          className="message-text"
        />
      );
    }
  }

  render() {
    return (
      <div className="channel-message-form">
        <form className="message-form">
          <div className="message-input">{this.determineType()}</div>
        </form>
      </div>
    );
  }
}

export default MessageForm;
