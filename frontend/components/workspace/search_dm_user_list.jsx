import React from "react";

class SearchDmUsersList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.users.length > 0) {
      return (
        <ul className="dm-search-list">
          {this.props.users.map((user) => {
            return (
              <li
                className="dm-user"
                onClick={() => this.props.click(user)}
                key={user.id}
              >
                {user.username}
              </li>
            );
          })}
        </ul>
      );
    } else {
      return null;
    }
  }
}

export default SearchDmUsersList;
