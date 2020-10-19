import React from "react";

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
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
          onFocus={}
        />
      );
    } else {
      return (
        <input
          type="text"
          onChange={this.handleChange}
          placeholder={`Message  # ${this.props.currentChannel.title}`}
          value={this.state.body}
          className="message-text"
          onFocus={}
        />
      );
    }
  }

  handleChange(e) {
    this.setState({ body: e.currentTarget.value });
  }

  handleClick(e) {
    const message = {
      body: this.state.body,
      channel_id: this.props.match.params.channelId,
    };
    this.props.createMessage(message).then(
      this.setState({ body: "" }, () => {
        if (
          $(".message-list-container") &&
          $(".message-list-container li:first-child").position()
        ) {
          $(".message-list-container ").animate(
            {
              scrollTop: $(".message-list-container li:first-child").position()
                .top,
            },
            "slow"
          );
        }
      })
    );
  }

  render() {
    return (
      <div className="channel-message-form">
        <form className="message-form">
          <div className="message-input">{this.determineType()}</div>
          {this.state.body !== "" ? (
            <button className="message-button" onClick={this.handleClick}>
              <i className="far fa-paper-plane send-plane"></i>
            </button>
          ) : null}
        </form>
        <div className="bottom-message-form"></div>
      </div>
    );
  }
}

export default MessageForm;
