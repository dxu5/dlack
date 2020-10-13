import React from "react";
import ChannelIndexItemContainer from "./channel_index_item_container.js";
class ChannelIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  channels() {
    return this.props.channels.map((channel) => {
      if (!channel.is_dm) {
        return <ChannelIndexItemContainer channel={channel} key={channel.id} />;
      }
    });
  }

  render() {
    return (
      <div className="channel-index">
        <div className="channels-header">
          <div>
            <h2>Channels</h2>
          </div>
          <div className="create-channel">+</div>
        </div>
        <div className="channels-ul">
          <ul>{this.channels()}</ul>
        </div>
      </div>
    );
  }
}

export default ChannelIndex;
