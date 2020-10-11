import React from "react";
import { Link } from "react-router-dom";
import HeaderContainer from "../splash/header_container.js";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      disabled: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  componentDidMount() {
    if (this.props.history.location.state) {
      if (this.props.history.location.state.demo) {
        this.handleDemo();
      }
    }
  }

  handleInput(type) {
    return (e) => {
      this.setState({ [type]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {
    if (!this.state.disabled) {
      e.preventDefault();
      this.props.processForm(this.state).then(() => {
        this.props.history.push("/workspace");
      });
    }
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

  handleDemo(e) {
    if (!this.state.disabled) {
      if (e) {
        e.preventDefault();
      }
      this.setState({ disabled: true }, () => {
        //for some reason the demo button is not getting disabled
        let demoButton = document.getElementById("demo");
        demoButton.classList.add("disabled");
      });
      let username = "dlack_demo";
      let password = "password";

      this.setState({ username: "", password: "" }, () => {
        this.demoLogin(username, password);
      });
    }
  }

  demoLogin(username, password) {
    username = username.split("");
    password = password.split("");
    const _demoUser = (username) => {
      if (username.length > 0) {
        let char = username.shift();
        this.setState({ username: this.state.username + char }, () =>
          setTimeout(() => {
            _demoUser(username);
          }, 100)
        );
      } else {
        _demoPass(password);
      }
    };
    const _demoPass = (password) => {
      if (password.length > 0) {
        let char = password.shift();
        this.setState({ password: this.state.password + char }, () =>
          setTimeout(() => {
            _demoPass(password);
          }, 100)
        );
      } else {
        this.props.processForm(this.state);
      }
    };
    _demoUser(username);
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
          <form>
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
            <input
              className={
                this.state.disabled ? "login-submit disabled" : "login-submit"
              }
              onClick={this.handleSubmit}
              type="submit"
              value="Log In"
            />
            <input
              type="submit"
              id="demo"
              className="demo-button"
              value="Log In As Demo User"
              onClick={this.handleDemo}
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
