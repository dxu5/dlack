import React from "react";
import { connect } from "react-redux";
import { deleteMessage } from "../../../actions/message_actions.js";
import EditMessageForm from "./edit_message_form.jsx";

class MessageIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleDelete() {
    this.props.deleteMessage(this.props.message.id);
  }

  handleClose() {
    this.setState({ edit: false });
  }

  handleOpen() {
    this.setState({ edit: true });
  }

  render() {
    if (this.state.edit) {
      return (
        <EditMessageForm
          message={this.props.message}
          handleClose={this.handleClose}
        />
      );
    } else if (this.props.same === false) {
      return (
        <li className="user-message">
          {this.props.user.profile_picture !== undefined ? (
            <img
              className="user-profile"
              src={this.props.user.profile_picture}
            />
          ) : (
            <img className="user-profile" src={window.images.user} />
          )}

          <div className="message-details">
            <h2 className="message-username">
              {this.props.user.username}
              <span className="timestamp">{this.props.message.updated_at}</span>
            </h2>
            <p>
              {this.props.message.body}
              {this.props.message.update === true ? (
                <span className="edited-message">(edited)</span>
              ) : null}
            </p>
          </div>
          {this.props.message.author_id === this.props.currentUserId ? (
            <div className="add-ons">
              <div className="pencil-icon" onClick={this.handleOpen}>
                <i className="fas fa-pencil-alt edit-icon"></i>
              </div>
              <div className="trash-icon" onClick={this.handleDelete}>
                <i className="fas fa-trash delete-icon"></i>
              </div>
            </div>
          ) : null}
        </li>
      );
    } else {
      return (
        <li className="repeat-message">
          <div className="repeat-message-details">
            <p>
              {this.props.message.body}
              {this.props.message.update === true ? (
                <span className="edited-message">(edited)</span>
              ) : null}
            </p>
          </div>
          {this.props.message.author_id === this.props.currentUserId ? (
            <div className="repeat-add-ons">
              <div className="pencil-icon" onClick={this.handleOpen}>
                <i className="fas fa-pencil-alt edit-icon"></i>
              </div>
              <div className="trash-icon" onClick={this.handleDelete}>
                <i className="fas fa-trash delete-icon"></i>
              </div>
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
