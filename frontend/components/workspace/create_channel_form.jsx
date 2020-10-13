import React from "react";
import { withRouter } from "react-router-dom";

class CreateChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      password: "",
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
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
            <h1>Create a Channel</h1>
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
            <label>
              Password:
              <input
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                className="login-input"
              />
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
