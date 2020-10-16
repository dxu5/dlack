import React from "react";

class Listener extends React.Component {
  constructor(props) {
    super(props);
    this.createSockets = this.createSockets.bind(this);
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.createSockets(this.props.channelIds);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //CHECK WITH RYAN IF THIS IS OK???????
    if (
      this.props.currentUser &&
      this.props.currentUser !== prevProps.currentUser
    ) {
      this.createSockets(this.props.channelIds);
    } else if (
      this.chats &&
      prevProps.channelIds.length !== this.props.channelIds.length
    ) {
      for (let i = 0; i < this.chats.length; i++) {
        let channel = JSON.parse(this.chats[i].identifier);
        if (!this.props.channelIds.includes(channel.channel_id)) {
          this.chats[i].unsubscribe();
        }
      }
      let oldChannelIds = this.chats.map((chat) => {
        return JSON.parse(chat.identifier).channelId;
      });
      let final = [];
      for (let i = 0; i < this.props.channelIds.length; i++) {
        if (!oldChannelIds.includes(this.props.channelIds[i])) {
          final.push(this.props.channelIds[i]);
        }
      }
      if (final.length > 0) {
        this.createSockets(final);
      }
    }
  }

  componentWillUnmount() {
    for (let i = 0; i < this.chats.length; i++) {
      let channel = this.chats[i];
      channel.unsubscribe();
    }
  }

  createSockets(channelIds) {
    console.log("Running create socket");

    let result = channelIds.map((id) => {
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
    if (this.chats === undefined) {
      this.chats = result;
    } else {
      this.chats = this.chats.concat(result);
    }
  }

  render() {
    return null;
  }
}

export default Listener;
