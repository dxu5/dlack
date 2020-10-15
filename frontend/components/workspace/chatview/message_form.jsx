import React from "react";

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      channel_id: Number(this.props.match.params.channelId),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  determineType() {
    if (this.props.currentChannel.is_private) {
      return (
        <input
          onChange={this.handleChange}
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

  handleChange(e) {
    this.setState({ body: e.currentTarget.value });
  }

  handleClick(e) {
    this.props.createMessage(this.state);
    this.setState({ body: "" });
  }

  render() {
    return (
      <div className="channel-message-form">
        <form className="message-form">
          <div className="message-input">{this.determineType()}</div>
          {this.state.body !== "" ? (
            <div className="message-button" onClick={this.handleClick}>
              <i className="far fa-paper-plane send-plane"></i>
            </div>
          ) : null}
        </form>
        <div className="bottom-message-form"></div>
      </div>
    );
  }
}

export default MessageForm;
