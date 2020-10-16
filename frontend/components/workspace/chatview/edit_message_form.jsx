import React from "react";
import { connect } from "react-redux";
import { updateMessage } from "../../../actions/message_actions";
class EditMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.message;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ body: e.currentTarget.value });
  }

  handleSubmit() {
    this.props.updateMessage(this.state).then(this.props.handleClose());
  }

  render() {
    return (
      <div className="message-edit">
        <div className="edit-form-container">
          <form>
            <div className="input">
              <input
                type="text"
                onChange={this.handleChange}
                value={this.state.body}
              />
              <button onClick={this.props.handleClose}>Cancel</button>
              <button onClick={this.handleSubmit}>Edit Message</button>
            </div>
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
