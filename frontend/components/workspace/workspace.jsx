import React from "react";
import SidenavContainer from "./sidenav_container.js";

class Workspace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let channelIds = this.props.channels.map((channel) => {
      return channel.id;
    });
    debugger;
    if (
      channelIds.includes(Number(this.props.match.params.channelId)) === false
    ) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div className="workspace">
        <SidenavContainer channels={this.props.channels} />
      </div>
    );
  }
}

export default Workspace;
