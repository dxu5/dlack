import React from "react";
import { withRouter } from "react-router-dom";
import debounce from "../../util/general_util";

class CreateChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      password: "",
      is_private: false,
      is_dm: false,
    };
    this.debounced = debounce(function () {
      console.log("wowowowowowow");
    }, 250);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return (e) => {
      if (field === "users") {
        this.setState(
          {
            [field]: e.currentTarget.value,
          },
          this.debounced
        );
      } else {
        this.setState({ [field]: e.currentTarget.value });
      }
    };
  }

  //   handleSubmit(e) {
  //     e.preventDefault();
  //     const user = Object.assign({}, this.state);
  //     this.props.processForm(user).then(this.props.closeModal);
  //   }

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
              x
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
            <input
              className="session-submit"
              type="submit"
              value={this.props.formType}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(CreateChannelForm);
