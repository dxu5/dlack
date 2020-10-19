import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser } from "../../actions/user_actions.js";
import { closeModal } from "../../actions/modal_actions";
import { clearErrors } from "../../actions/session_actions.js";

class UpdateUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.currentUser;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.updateUser(this.state).then(this.props.closeModal);
  }

  renderErrors() {
    return (
      <ul className="channel-errors">
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>{error}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="channel-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          <div className="channel-modal-header">
            <h1>Edit Your Profile</h1>
            <br />
            <div onClick={this.props.closeModal} className="close-x">
              &#10005;
            </div>
          </div>
          <p className="create-channel-description">
            Want to change your username or handle? Make the changes that you
            need to stay on top of your productivity.
          </p>

          <div className="channel-form">
            <br />
            <label className="channel-create-name">
              Username
              <br />
              <input
                type="text"
                placeholder="Your username"
                value={this.state.username}
                onChange={this.update("username")}
                className="create-channel-title-input"
              />
            </label>
            <br />
            {this.renderErrors()}
            <br />
            <input
              className="channel-edit"
              type="submit"
              value="Update Profile"
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.entities.users[state.session.currentUserId],
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    clearErrors: () => dispatch(clearErrors()),
    closeModal: () => {
      dispatch(clearErrors());
      dispatch(closeModal());
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UpdateUserForm)
);