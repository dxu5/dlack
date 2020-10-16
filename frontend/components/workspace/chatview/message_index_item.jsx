import React from "react";

class MessageIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.same === false) {
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
    } else {
      return (
        <li className="repeat-message">
          <div className="repeat-message-details">
            <p>{this.props.message.body}</p>
          </div>
          <aside className="repeat-date">{this.props.message.updated_at}</aside>
        </li>
      );
    }
  }
}

export default MessageIndexItem;
