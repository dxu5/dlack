import React from "react";
import { withRouter } from "react-router-dom";
import debounce from "../../util/general_util";
import { connect } from "react-redux";
import { searchUsers } from "../../actions/search_actions.js";
import { updateChannel } from "../../actions/channel_actions.js";
import SearchUsersList from "./search_users_list.jsx";

class UpdateChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.currentChannel.title,
      users: "",
      is_private: this.props.currentChannel.is_private,
      is_dm: false,
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
    if (!this.state.is_private) {
      const channel = {
        id: this.props.currentChannelId,
        title: this.state.title,
        is_private: false,
        is_dm: false,
      };
      this.props.updateChannel(channel).then(() => {
        this.props.closeModal;
      });
    } else {
      let users = Object.keys(this.state.selected);
      if (!users.includes(this.props.currentUserId)) {
        users.push(this.props.currentUserId);
      }
      users = users.join(",");
      const channel = {
        id: this.props.currentChannelId,
        title: this.state.title,
        is_private: true,
        is_dm: false,
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
  determineType() {
    if (this.state.is_private) {
      return (
        <input
          type="text"
          placeholder="&#xF023;  e.g. discussion-meetings"
          style={{ fontFamily: "Poppins, FontAwesome" }}
          value={this.state.title}
          onChange={this.update("title")}
          className="create-channel-title-input"
        />
      );
    } else {
      return (
        <input
          type="text"
          placeholder="# e.g. discussion-meetings"
          value={this.state.title}
          onChange={this.update("title")}
          className="create-channel-title-input"
        />
      );
    }
  }

  parseUsers() {
    if (this.state.users !== "") {
      let searched = [];
      this.props.totalUsers.forEach((user) => {
        if (
          user.username.startsWith(this.state.users) &&
          this.props.currentUserId != user.id &&
          this.state.selected[user.id] === undefined
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
      <div className="channel-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          <div className="channel-modal-header">
            <h1>Edit Your Channel</h1>
            <br />
            <div onClick={this.props.closeModal} className="close-x">
              &#10005;
            </div>
          </div>
          <p className="create-channel-description">
            As the owner of the channel, you can take charge of the team. Rename
            the channel or move around some people in order to keep your team
            productive.
          </p>

          <div className="channel-form">
            <br />
            <label className="channel-create-name">
              Title
              <br />
              {this.determineType()}
            </label>
            <br />
            {!this.state.is_private ? null : (
              <div>
                <label className="channel-create-name">
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
                  <div className="channel-input">
                    <input
                      type="text"
                      placeholder="e.g. Derek, Hailey, Robert"
                      value={this.state.users}
                      onChange={this.update("users")}
                      className="create-channel-users-input"
                    />
                    <SearchUsersList
                      users={this.parseUsers()}
                      click={this.handleClick}
                    />
                  </div>
                </label>
              </div>
            )}
            {this.renderErrors()}
            <br />
            <input className="channel-create" type="submit" value="Edit" />
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
    updateChannel: (channel) => dispatch(updateChannel(channel)),
    searchUsers: (search) => dispatch(searchUsers(search)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UpdateChannelForm)
);
