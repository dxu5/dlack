import React from "react";

class MessageIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="user-message">
        <img className="user-profile" src={window.images.user} />
        <div className="message-details">
          <h2 className="message-username">
            {this.props.user.username}
            <span className="timestamp">{this.props.message.updated_at}</span>
          </h2>
          <p>{this.props.message.body}</p>
        </div>
      </li>
    );
  }
}

export default MessageIndexItem;
