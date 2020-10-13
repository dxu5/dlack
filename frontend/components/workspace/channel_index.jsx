import React from "react";

class ChannelIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  channels() {
    return this.props.channels.map((channel) => {
      if (!channel.is_dm) {
        return <li>{channel.title}</li>;
      }
    });
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <h2>Channels</h2>
          </div>
          <div>+</div>
        </div>
        <div>
          <ul>{this.channels()}</ul>
        </div>
      </div>
    );
  }
}

export default ChannelIndex;
