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
            <li onClick={() => this.props.click(user.username)} key={user.id}>
              {user.username}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default SearchUsersList;
