import React from "react";
import { withRouter } from "react-router-dom";
import debounce from "../../util/general_util";
import { connect } from "react-redux";
import { searchUsers } from "../../actions/search_actions.js";
import { createChannel } from "../../actions/channel_actions.js";
import SearchUsersList from "./search_users_list.jsx";

class CreateDmForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: "",
      is_private: true,
      is_dm: true,
      selected: {},
    };
    this.debounced = debounce(function () {
      this.props.searchUsers(this.state.users);
    }, 1000);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  update(field) {
    return (e) => {
      if (field === "users") {
        this.setState(
          {
            [field]: e.currentTarget.value,
          },
          () => {
            if (this.state.users !== "") {
              this.debounced();
            }
          }
        );
      } else {
        this.setState({ [field]: e.currentTarget.value });
      }
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.is_private) {
      const channel = {
        title: this.state.title,
        is_private: false,
        is_dm: false,
      };
      this.props.createChannel(channel).then(this.props.closeModal);
    } else {
      let users = Object.keys(this.state.selected);
      if (!users.includes(this.props.currentUserId)) {
        users.push(this.props.currentUserId);
      }
      users = users.join(",");
      const channel = {
        is_private: false,
        is_dm: true,
        user_ids: users,
      };
      this.props.createChannel(channel).then(this.props.closeModal);
    }
  }

  renderErrors() {
    return (
      <ul className="channel-errors">
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>{error}</li>
        ))}
      </ul>
    );
  }

  parseUsers() {
    if (this.state.users !== "") {
      let searched = [];
      this.props.totalUsers.forEach((user) => {
        if (user.username.startsWith(this.state.users)) {
          searched.push(user);
        }
      });
      return searched;
    } else {
      return [];
    }
  }

  handleClick(user) {
    this.setState({
      selected: { ...this.state.selected, [user.id]: user },
      users: "",
    });
  }

  render() {
    return (
      <div className="channel-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          <div className="channel-modal-header">
            <h1>Create a Direct Message or Group Chat</h1>
            <br />
            <div onClick={this.props.closeModal} className="close-x">
              &#10005;
            </div>
          </div>
          <p className="create-channel-description">
            Direct messages or group chats help you focus your message even
            more. They help you directly communicate with your teammates to
            increase productivity.
          </p>

          <div className="channel-form">
            <br />
            <div>
              <label className="channel-create-name">
                Users
                <br />
                <ul>
                  {Object.values(this.state.selected).map((user) => {
                    return <li>{user.username}</li>;
                  })}
                </ul>
                <input
                  type="text"
                  placeholder="e.g. Derek, Hailey, Robert"
                  value={this.state.users}
                  onChange={this.update("users")}
                  className="create-channel-title-input"
                />
              </label>
              <SearchUsersList
                users={this.parseUsers()}
                click={this.handleClick}
              />
            </div>
            {this.renderErrors()}
            <br />
            <input className="channel-create" type="submit" value="Create" />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    createChannel: (channel) => dispatch(createChannel(channel)),
    searchUsers: (search) => dispatch(searchUsers(search)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateDmForm)
);
