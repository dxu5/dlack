import React from "react";

class MessageIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="user-message">
        <img src={window.images.user} />
        <div>{this.props.message.body}</div>
      </li>
    );
  }
}

export default MessageIndexItem;
