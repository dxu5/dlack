import React from "react";

class Listener extends React.Component {
  constructor(props) {
    super(props);
    this.createSocket = this.createSocket.bind(this);
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.createSocket();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.currentUser &&
      this.props.currentUser !== prevProps.currentUser
    ) {
      this.createSocket();
    }
  }

  componentWillUnmount() {
    this.channel.unsubscribe();
  }

  createSocket() {
    console.log("Running channel create socket");

    this.channel = App.cable.subscriptions.create(
      {
        channel: "ChannelChannel",
      },
      {
        connected: () => {
          console.log(`Connected!! to channels`);
        },
        disconnected: () => {
          console.log(`Disconnected!! from channels`);
        },
        received: (data) => {
          if (data.update === true) {
            if (data.userIds.includes(Number(this.props.currentUser))) {
              let payload = JSON.parse(data.payload);
              this.props.receiveChannelInfo(payload);
            } else {
              let channelId = JSON.parse(data.payload).channel.id;
              this.props.deleteChannel(channelId);
            }
          } else if (
            data.id &&
            data.id.channelUsers.includes(Number(this.props.currentUser))
          ) {
            let payload = data.channel;
            this.props.receiveChannel(payload);
          } else if (data.channel.delete === true) {
            let payload = data.channel.id;
            this.props.deleteChannel(payload);
          }
        },
      }
    );
  }

  render() {
    return null;
  }
}

export default Listener;
