import React from "react";
import ReactQuill from "react-quill";

// const toolbar = [
//   [{ font: [] }],
//   [{ size: ["small", false, "large", "huge"] }],
//   ["bold", "italic", "underline", "strike"],
//   [{ color: [] }, { background: [] }],
//   ["blockquote"],
//   ["image", "video"],
//   [{ align: [] }],
//   [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
//   [{ script: "sub" }, { script: "super" }],
//   ["clean"],
// ];

// const modules = {
//   toolbar,
// };

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
        <ReactQuill
          className="quill-editor"
          value={this.state.body}
          onChange={this.handleChange}
          placeholder="Message this channel"
          onFocus={this.props.getChannelInfo}
        />
        // <input
        //   onChange={this.handleChange}
        //   type="text"
        //   placeholder={`Message 🔒 ${this.props.currentChannel.title}`}
        //   style={{ fontFamily: "Poppins, FontAwesome" }}
        //   value={this.state.body}
        //   className="message-text"
        //   onFocus={this.props.getChannelInfo}
        // />
      );
    } else {
      return (
        <ReactQuill
          className="quill-editor"
          value={this.state.body}
          onChange={this.handleChange}
          placeholder="Message this channel"
          onFocus={this.props.getChannelInfo}
        />
        // <input
        //   type="text"
        //   onChange={this.handleChange}
        //   placeholder={`Message  # ${this.props.currentChannel.title}`}
        //   value={this.state.body}
        //   className="message-text"
        //   onFocus={this.props.getChannelInfo}
        // />
      );
    }
  }

  handleChange(e) {
    // this.setState({ body: e.currentTarget.value });
    this.setState({ body: e });
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
    console.log(this.state);
    console.log(this.props);
    return (
      <div className="channel-message-form">
        <div className="message-input">{this.determineType()}</div>
        {this.state.body !== "" && this.state.body !== "<p><br></p>" ? (
          <button className="message-button" onClick={this.handleClick}>
            <i className="far fa-paper-plane send-plane"></i>
          </button>
        ) : null}
      </div>
    );
  }
}

export default MessageForm;
