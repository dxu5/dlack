import React from "react";
import SidenavContainer from "./sidenav_container.js";

class Workspace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="workspace">
        <SidenavContainer />
      </div>
    );
  }
}

export default Workspace;
