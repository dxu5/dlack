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
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
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
    let users = Object.keys(this.state.selected);
    if (users.length > 0) {
      if (!users.includes(this.props.currentUserId)) {
        users.push(this.props.currentUserId);
      }
      users = users.join(",");
      const channel = {
        is_private: true,
        is_dm: true,
        user_ids: users,
      };
      this.props.createChannel(channel).then(this.props.closeModal);
    }
  }

  renderErrors() {
    return (
      <ul className="dm-errors">
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
        if (
          user.username.startsWith(this.state.users) &&
          this.props.currentUserId != user.id
        ) {
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

  handleDelete(username) {
    for (const user in this.state.selected) {
      if (this.state.selected[user].username === username) {
        let newSelected = Object.assign({}, this.state.selected);
        delete newSelected[user];

        this.setState({ selected: newSelected });
      }
    }
  }

  render() {
    return (
      <div className="dm-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          <div className="dm-modal-header">
            <h1>Create a Direct Message or Group Chat</h1>
            <br />
            <div onClick={this.props.closeModal} className="close-x">
              &#10005;
            </div>
          </div>
          <p className="create-dm-description">
            Direct messages or group chats help you focus your message even
            more. They help you directly communicate with your teammates to
            increase productivity.
          </p>

          <div className="dm-form">
            <br />
            <div>
              <label className="dm-create-name">
                Users
                <br />
                <ul className="selected-users-list">
                  {Object.values(this.state.selected).map((user) => {
                    return (
                      <li className="selected-users" key={user.id}>
                        {user.username}{" "}
                        <div
                          onClick={() => this.handleDelete(user.username)}
                          className="selected-delete"
                        >
                          &#10005;
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <input
                  type="text"
                  placeholder="e.g. Derek, Hailey, Robert"
                  value={this.state.users}
                  onChange={this.update("users")}
                  className="create-dm-title-input"
                />
              </label>
              <SearchUsersList
                users={this.parseUsers()}
                click={this.handleClick}
              />
            </div>
            {this.renderErrors()}
            <br />
            <input className="dm-create" type="submit" value="Create" />
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
