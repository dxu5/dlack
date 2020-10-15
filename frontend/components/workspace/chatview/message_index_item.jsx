import React from "react";

class MessageIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <li className="user-message">{this.props.message.body}</li>;
  }
}

export default MessageIndexItem;
