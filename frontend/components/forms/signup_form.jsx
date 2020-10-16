import React from "react";
import { Link } from "react-router-dom";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(type) {
    return (e) => {
      this.setState({ [type]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state).then(() => {
      this.props.history.push("/channels/1");
    });
  }

  renderErrors() {
    if (this.props.errors.length > 0) {
      return (
        <div className="errors">
          <ul>
            {this.props.errors.map((error, idx) => {
              return <li key={idx}>{error}</li>;
            })}
          </ul>
        </div>
      );
    }
  }

  componentWillMount() {
    this.props.clearErrors();
  }

  render() {
    return (
      <div className="signup">
        <Link to="/">
          <img className="signup-logo" src={window.images.dlacklogo} />
        </Link>

        <div className="signup-form">
          <h1>Let's Get You Started</h1>
          <form onSubmit={this.handleSubmit}>
            <p>
              Create your <strong>username</strong> and{" "}
              <strong>password</strong>.
            </p>
            <input
              type="text"
              className="auth-credentials"
              onChange={this.handleInput("username")}
              value={this.state.username}
              placeholder="Username Handle"
            />
            <br />
            <input
              type="password"
              className="auth-credentials"
              onChange={this.handleInput("password")}
              value={this.state.password}
              placeholder="Six characters please"
            />

            {this.renderErrors()}

            <input
              className="signup-submit"
              type="submit"
              value="Create Your Account"
            />
          </form>
          <div>
            Got an account with us?{" "}
            <Link className="login-alt" to="/login">
              Sign In
            </Link>
          </div>
        </div>
        <div className="nav-icons">
          <a
            target="_blank"
            href="https://www.linkedin.com/in/derek-jinxiao-xu/"
            className="home-nav-icons"
          >
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
          <a
            href="https://dxu5.github.io/"
            target="_blank"
            className="home-nav-icons"
          >
            <i className="fas fa-user-alt fa-2x"></i>
          </a>
          <a
            href="https://github.com/dxu5"
            target="_blank"
            className="home-nav-icons"
          >
            <i className="fab fa-github fa-2x"></i>
          </a>
        </div>
      </div>
    );
  }
}

export default SignupForm;
