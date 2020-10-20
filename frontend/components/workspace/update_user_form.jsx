import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser } from "../../actions/user_actions.js";
import { closeModal } from "../../actions/modal_actions";
import { clearErrors } from "../../actions/session_actions.js";

class UpdateUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.currentUser,
      new_profile_picture: null,
      imageUrl: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
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
    const formData = new FormData();
    formData.append("user[username]", this.state.username);
    if (this.state.new_profile_picture) {
      formData.append("user[profile_picture]", this.state.new_profile_picture);
      // formData.append("user[file_name]", this.state.username);
    }
    this.props
      .updateUser(formData, this.props.currentUser.id)
      .then(this.props.closeModal);
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

  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({
        new_profile_picture: file,
        imageUrl: fileReader.result,
      });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  render() {
    console.log(this.state);
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
            <label className="channel-create-name">
              Profile Picture
              <br />
              <div className="picture-box">
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={this.handleFile}
                  className="inputfile"
                />
                {this.state.imageUrl ? (
                  <img src={this.state.imageUrl} className="add-picture" />
                ) : this.props.currentUser.profile_picture !== undefined ? (
                  <img
                    src={this.props.currentUser.profile_picture}
                    className="add-picture"
                  />
                ) : (
                  <img src={window.images.user} className="add-picture" />
                )}
                <div className="middle">
                  <div className="text">Update Photo</div>
                </div>
              </div>
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
    currentUserId: state.session.currentUserid,
    currentUser: state.entities.users[state.session.currentUserId],
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user, id) => dispatch(updateUser(user, id)),
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
