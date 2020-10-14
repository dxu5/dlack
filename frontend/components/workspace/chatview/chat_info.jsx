import React from "react";

class ChatInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  handleTitleType(){
      if(this.props.currentChannel)
  }

  render() {
    return (
      <div className="channel-info-header">
        <div className="location-info">
          <h2 className="channel-info-title">

            {this.props.currentChannel.title}
          </h2>
        </div>
      </div>
    );
  }
}

export default ChatInfo;
