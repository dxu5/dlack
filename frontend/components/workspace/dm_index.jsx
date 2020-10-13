import React from "react";
import DMIndexItemContainer from "./dm_index_item_container.js";
class ChannelIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  dms() {
    return this.props.channels.map((channel) => {
      if (channel.is_dm) {
        return <DMIndexItemContainer channel={channel} key={channel.id} />;
      }
    });
  }

  renderList() {
    if (this.state.open) {
      return <ul>{this.dms()}</ul>;
    } else {
      <ul></ul>;
    }
  }

  handleClick() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div className="channel-index">
        <div className="channels-header">
          <div className="caret-container">
            <i
              id="caret"
              className={
                this.state.open ? "fas fa-caret-down" : "fas fa-caret-right"
              }
            ></i>
          </div>

          <h2 onClick={this.handleClick}>Direct Messages</h2>
          <div className="create-channel">+</div>
        </div>
        <div className="channels-ul">{this.renderList()}</div>
      </div>
    );
  }
}

export default ChannelIndex;