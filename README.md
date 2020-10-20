<p align="center"><a target="_blank" href="https://dlack.herokuapp.com/#/"><img src="./app/assets/images/dlacklogo.png" width=250px/></a></p>

<h1 align="center">Dlack</h1>
<p align="center">
  <a href="#dlack-uses-these-technologies">Technologies</a> •
  <a href="#key-features">Key Features</a> 
</p>

<p align="center">A web application implemented with websockets, Rails/PostgreSQL backend and React/Redux frontend stack. In order to increase productivity and get work done, users can create channels, direct messages, and group chats. Everything is done in real time.</p>

<p align="center"><a target="_blank" href="https://dlack.herokuapp.com/#/"><img src="./app/assets/images/dlackhome.png"  width=650px/></a></p>

## Dlack Uses These Technologies

- Websockets: ActionCable
- Ruby on Rails
- React
- Redux
- Postgresql Database
- HTML5 and SCSS

## Key Features

- Secure frontend to backend user authentication using BCrypt Hashing
- Users can create or direct messages, and update or delete channels for those that they have permission to
- Users can create, read, update, and delete messages
- Message feed dynamically updates using web sockets to display all incoming messages
- Full Notification System so users know when they receive a message

### Live Chat

Dlack utilizes ActionCable, a WebSocket framework for Rails, allowing open connections in order to edit, create, and delete messages and channels all in real-time

```js
// frontend/components/listener.jsx
createSockets(channelIds) {
  let result = channelIds.map((id) => {
      return App.cable.subscriptions.create(
        {
          channel: "MessageChannel",
          channel_id: id,
        },
        {
          received: (data) => {
           if (data.message.update) {
              let payload = {
                id: data.message.id,
                body: data.message.body,
                author_id: data.message.author_id,
                channel_id: data.message.channel_id,
                updated_at: data.message.updated_at,
                updated: true,
              };
              this.props.receiveUpdateMessage(payload);
            }
          },
        }
}
```

On the backend, cables are dynamically created using params (channel-id) sent from the frontend listener component:

```rb
# app/channels/message_channel.rb
class MessageChannel < ApplicationCable::Channel
  def subscribed
    stream_from "channel-#{params["channel_id"]}:messages"
  end

  def unsubscribed; end
end
```
