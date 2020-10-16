import React from "react";

class Listener extends React.Component {
  constructor(props) {
    super(props);
    this.createSockets = this.createSockets.bind(this);
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.createSockets();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.currentUser &&
      this.props.currentUser !== prevProps.currentUser
    ) {
      this.createSockets();
    }
  }

  componentWillUnmount() {
    for (let i = 0; i < this.chats.length; i++) {
      let channel = this.chats[i];
      channel.unsubscribe();
    }
  }

  createSockets() {
    console.log("Running create socket");

    let channelIds = this.props.channelIds;

    this.chats = channelIds.map((id) => {
      return App.cable.subscriptions.create(
        {
          channel: "MessageChannel",
          channel_id: id,
        },
        {
          connected: () => {
            console.log(`Connected!! to ${id}`);
          },
          disconnected: () => {
            console.log(`Disconnected!! from ${id}`);
          },
          received: (data) => {
            let payload = {
              message: data.message,
              user: data.user,
            };
            this.props.receiveMessage(payload);
          },
        }
      );
    });
  }

  render() {
    return null;
  }
}

export default Listener;
