import React from "react";
import ReactQuill from "react-quill";

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    const handleClick = this.handleClick;
    this.bindings = {
      tab: {
        key: 13,
        shiftKey: false,
        handler: function () {
          let body = $(".ql-editor").html();
          let arr = body.split("<p><br></p>");
          let parseBody = arr.filter((x) => x !== "");
          if (body !== "" && parseBody.length !== 0) {
            handleClick();
          }
        },
      },
    };
    this.modules = {
      keyboard: {
        bindings: this.bindings,
      },
    };
  }

  componentDidUpdate() {
    if (this.props.currentChannel.is_private) {
      $(".quill-editor .ql-blank").attr(
        "data-placeholder",
        `Message 🔒 ${this.props.currentChannel.title}`
      );
    } else {
      $(".quill-editor .ql-blank").attr(
        "data-placeholder",
        `Message  # ${this.props.currentChannel.title}`
      );
    }
  }

  determineType() {
    if (this.props.currentChannel.is_private) {
      return (
        <ReactQuill
          className="quill-editor"
          value={this.state.body}
          onChange={this.handleChange}
          onFocus={this.props.getChannelInfo}
          modules={this.modules}
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
          onFocus={this.props.getChannelInfo}
          modules={this.modules}
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

  parseBody() {
    let arr = this.state.body.split("<p><br></p>");
    return arr.filter((x) => x !== "");
  }

  render() {
    return (
      <div className="channel-message-form">
        <div className="message-input">{this.determineType()}</div>
        {this.state.body !== "" && this.parseBody().length !== 0 ? (
          <button className="message-button" onClick={this.handleClick}>
            <i className="far fa-paper-plane send-plane"></i>
          </button>
        ) : null}
      </div>
    );
  }
}

export default MessageForm;
