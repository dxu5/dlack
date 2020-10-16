import React from "react";
import { connect } from "react-redux";
import { deleteMessage } from "../../../actions/message_actions.js";

class MessageIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.deleteMessage(this.props.message.id);
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
          {this.props.message.author_id === this.props.currentUserId ? (
            <div className="add-ons" onClick={this.handleDelete}>
              <i className="fas fa-trash delete-icon"></i>
            </div>
          ) : null}
        </li>
      );
    } else {
      return (
        <li className="repeat-message">
          <div className="repeat-message-details">
            <p>{this.props.message.body}</p>
          </div>
          {this.props.message.author_id === this.props.currentUserId ? (
            <div className="repeat-add-ons" onClick={this.handleDelete}>
              <i className="fas fa-trash delete-icon"></i>
            </div>
          ) : null}

          <aside className="repeat-date">{this.props.message.updated_at}</aside>
        </li>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.session.currentUserId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMessage: (messageId) => dispatch(deleteMessage(messageId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageIndexItem);
