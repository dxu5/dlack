import React from "react";

class Sidenav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div>
          <h1>Welcome</h1>
          <h2>{this.props.currentUser.username}</h2>
          <button onClick={this.props.logout}>Logout</button>
        </div>
      </div>
    );
  }
}

export default Sidenav;
