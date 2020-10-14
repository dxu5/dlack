import React from "react";

class SearchUsersList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        {this.props.users.map((user) => {
          return (
            <li
              className="search-user"
              onClick={() => this.props.click(user)}
              key={user.id}
            >
              {user.username}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default SearchUsersList;
