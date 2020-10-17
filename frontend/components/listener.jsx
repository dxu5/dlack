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
    if (
      this.props.currentUser &&
      this.props.currentUser !== prevProps.currentUser
    ) {
      this.createSockets(this.props.channelIds);
    } else if (
      this.chats &&
      prevProps.channelIds.length !== this.props.channelIds.length
    ) {
      let oldChannelIds = [];
      let j = 0;
      while (j < this.chats.length) {
        let channel = JSON.parse(this.chats[j].identifier);
        oldChannelIds.push(channel.channel_id);
        if (!this.props.channelIds.includes(channel.channel_id)) {
          this.chats[j].unsubscribe();
          this.chats.splice(j, 1);
        } else {
          j += 1;
        }
      }
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
            if (data.user) {
              let payload = {
                message: data.message,
                user: data.user,
              };
              this.props.receiveMessage(payload);
            } else if (data.message.update) {
              let payload = {
                id: data.message.id,
                body: data.message.body,
                author_id: data.message.author_id,
                channel_id: data.message.channel_id,
                updated_at: data.message.updated_at,
              };
              this.props.updateMessage(payload);
            } else {
              let payload = {
                message: data.message,
              };
              this.props.removeMessage(payload.message);
            }
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
