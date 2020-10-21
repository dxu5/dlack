import React from "react";
import { connect } from "react-redux";
import { updateMessage } from "../../../actions/message_actions";
import ReactQuill from "react-quill";
class EditMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.message;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkChange = this.checkChange.bind(this);
    const handleSubmit = this.handleSubmit;
    const checkChange = this.checkChange;
    const handleClose = this.props.handleClose;
    this.bindings = {
      escape: {
        key: 27,
        handler: function () {
          handleClose();
        },
      },
      enter: {
        key: 13,
        shiftKey: false,
        handler: function () {
          let body = $(".ql-editor").html();
          let arr = body.split("<p><br></p>");
          let parseBody = arr.filter((x) => x !== "");
          if (
            body !== "" &&
            parseBody.length !== 0 &&
            checkChange() === false
          ) {
            handleSubmit();
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

  checkChange() {
    return this.state.body === this.props.message.body;
  }

  handleChange(e) {
    // this.setState({ body: e.currentTarget.value });
    this.setState({ body: e });
  }

  handleSubmit() {
    this.props.updateMessage(this.state).then(this.props.handleClose());
  }

  parseBody() {
    let arr = this.state.body.split("<p><br></p>");
    return arr.filter((x) => x !== "");
  }

  render() {
    return (
      <div className="message-edit">
        <div className="edit-form-container">
          <form className="edit-message-form">
            <div className="edit-form-input-div">
              <ReactQuill
                className="quill-editor"
                value={this.state.body}
                onChange={this.handleChange}
                modules={this.modules}
              />
              {/* <input
                type="text"
                onChange={this.handleChange}
                value={this.state.body}
                className="edit-form-input"
              /> */}
            </div>
            <button className="edit-cancel" onClick={this.props.handleClose}>
              Cancel
            </button>
            {this.state.body === "" ||
            this.state.body === this.props.message.body ||
            this.parseBody().length === 0 ? (
              <div className="edit-submit-disabled">Edit Message</div>
            ) : (
              <div className="edit-submit" onClick={this.handleSubmit}>
                Edit Message
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMessage: (message) => dispatch(updateMessage(message)),
  };
};

export default connect(null, mapDispatchToProps)(EditMessageForm);
