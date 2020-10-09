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
        <div>
          <ul>
            {this.props.errors.map((error, idx) => {
              return <li key={idx}>{error}</li>;
            })}
          </ul>
        </div>
      );
    }
  }

  // determineType() {
  //   let final =
  //     this.props.formType === "Log In" ? (
  //       <div>
  //         Got an account with us? <Link to="/login">Sign In</Link>
  //       </div>
  //     ) : (
  //       <div>
  //         Need an account with us? <Link to="signup">Sign Up</Link>
  //       </div>
  //     );
  //   return final;
  // }

  render() {
    return (
      <div>
        <div>
          <HeaderContainer />
        </div>
        {this.renderErrors()}
        <div>
          <h1>Sign In To Dlack</h1>
          <form onSubmit={this.handleSubmit}>
            <p>Enter your username and password.</p>
            <input
              type="text"
              onChange={this.handleInput("username")}
              value={this.state.username}
              placeholder="Your Username"
            />
            <input
              type="password"
              onChange={this.handleInput("password")}
              value={this.state.password}
              placeholder="Your Password"
            />
            <input type="submit" value="Log In" />
          </form>
          <div>
            Need an account with us? <Link to="signup">Sign Up</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
