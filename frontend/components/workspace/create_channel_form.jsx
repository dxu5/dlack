import React from "react";
import { withRouter } from "react-router-dom";
import debounce from "../../util/general_util";
import { connect } from "react-redux";
import { searchUsers } from "../../actions/search_actions.js";
import { createChannel } from "../../actions/channel_actions.js";

class CreateChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      users: "",
      is_private: false,
      is_dm: false,
    };
    this.debounced = debounce(function () {
      this.props.searchUsers(this.state.users);
    }, 1000);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return (e) => {
      if (field === "users") {
        this.setState(
          {
            [field]: e.currentTarget.value,
          },
          () => {
            if (this.state.users !== "") {
              this.debounced();
            }
          }
        );
      } else {
        this.setState({ [field]: e.currentTarget.value });
      }
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.is_private) {
      const channel = {
        title: this.state.title,
        is_private: false,
        is_dm: false,
      };
      this.props.createChannel(channel).then(this.props.closeModal);
    }
  }

  renderErrors() {
    return (
      <ul>
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
            <h1>
              {!this.state.is_private
                ? "Create a Channel"
                : "Create a Private Channel"}
            </h1>
            <br />
            <div onClick={this.props.closeModal} className="close-x">
              &#10005;
            </div>
          </div>
          <p className="create-channel-description">
            Channels are how you communicate with your team. The name of the
            channel is one of the first steps to increasing productivity - like
            #deadlines.
          </p>

          {this.renderErrors()}
          <div className="channel-form">
            <br />
            <label className="channel-create-name">
              Title
              <br />
              <input
                type="text"
                placeholder="# e.g. discussion-meetings"
                value={this.state.title}
                onChange={this.update("title")}
                className="create-channel-title-input"
              />
            </label>
            <br />
            {!this.state.is_private ? null : (
              <label className="channel-create-name">
                Users
                <br />
                <input
                  type="text"
                  placeholder="e.g. Derek, Hailey, Robert"
                  value={this.state.users}
                  onChange={this.update("users")}
                  className="create-channel-title-input"
                />
              </label>
            )}

            <label className="private">
              <p>
                <strong>Make Private</strong>
                <br />
                {!this.state.is_private ? (
                  <>
                    When a channel is set to private, it can only be viewed by
                    users who are in it.
                  </>
                ) : (
                  <>
                    <strong>This can't be undone.</strong> A private channel
                    cannot be made public later on.
                  </>
                )}
              </p>
              <label className="switch">
                <input
                  type="checkbox"
                  id="private"
                  onClick={() =>
                    this.setState({ is_private: !this.state.is_private })
                  }
                />
                <span className="slider round"></span>
              </label>
            </label>
            <br />
            <input className="channel-create" type="submit" value="Create" />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    createChannel: (channel) => dispatch(createChannel(channel)),
    searchUsers: (search) => dispatch(searchUsers(search)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateChannelForm)
);
