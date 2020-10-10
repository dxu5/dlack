import React from "react";
import { Link } from "react-router-dom";
import HeaderContainer from "../splash/header_container.js";

class LoginForm extends React.Component {
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
      this.props.history.push("/workspace");
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
      <div className="login">
        <div className="header">
          <HeaderContainer />
        </div>
        {this.renderErrors()}
        <div className="login-form">
          <h1>Sign In To Dlack</h1>
          <form onSubmit={this.handleSubmit}>
            <p>
              Enter your <strong>username</strong> and <strong>password</strong>
              .
            </p>
            <input
              type="text"
              className="auth-credentials"
              onChange={this.handleInput("username")}
              value={this.state.username}
              placeholder="Your Username"
            />
            <input
              type="password"
              className="auth-credentials"
              onChange={this.handleInput("password")}
              value={this.state.password}
              placeholder="Your Password"
            />
            <input className="login-submit" type="submit" value="Log In" />
            <input
              className="demo-button"
              type="submit"
              value="Log In As Demo User"
              // onClick={this.handleDemo}
            />
          </form>
          <div>
            Need an account with us?{" "}
            <Link className="signup-alt" to="signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
