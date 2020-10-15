import React from "react";

class MessageIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.message.body}</div>;
  }
}

export default MessageIndexItem;
