<p align="center"><a target="_blank" href="https://dlack.herokuapp.com/#/"><img src="./app/assets/images/dlacklogo.png" width=250px/></a></p>

<h1 align="center">Dlack</h1>
<p align="center">
  <a href="#dlack-uses-these-technologies">Technologies</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#live-chat">Live Chat</a> •
  <a href="#channels-and-direct-messages-crud">Channels and Direct Messages</a> •
  <a href="#message-notifications">Notifications</a>
</p>

<p align="center">A web application implemented with websockets, Rails/PostgreSQL backend, and React/Redux frontend stack. In order to increase productivity and get work done, users can create channels, direct messages, and group chats. Everything is done in real time.</p>

<p align="center"><a target="_blank" href="https://dlack.herokuapp.com/#/"><img src="./app/assets/images/dlackhome.png"  width=650px/></a></p>

## Dlack Uses These Technologies

### Backend

- Ruby on Rails
- PostgreSQL

### Frontend

- React
- Redux
- HTML
- CSS

### Other

- React-Quill
- AWS S3
- ActiveCable (Websockets)
- Webpack / Babel

## Key Features

- Secure frontend to backend user authentication using BCrypt Hashing
- Users can create channels or direct messages, and update or delete channels for those that they have permission to
- Users can create, read, update, and delete messages
- Message feed dynamically updates using web sockets to display all incoming messages
- Full Notification System so users know when they receive a message

### Live Chat

<img src="./app/assets/images/message.gif" width=800px/>

Dlack utilizes ActionCable, a WebSocket framework for Rails, which creates open connections to edit, create, and delete messages and channels all in real-time.
<br>
<br>
View channels you've joined and communicate with other people - live! No need to refresh the page.
<br>
<br>
Connections are made via the code below:

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

When a message is then created by a user, the controller action will then broadcast the response to all subscribed users:

```rb
# app/controllers/messages_controller.rb
def create
  ActionCable
    .server
    .broadcast("channel-#{@message.channel_id}:messages",
            message: {
                id: @message.id,
                body: @message.body,
                author_id: @message.author_id,
                channel_id: @message.channel_id,
                updated_at: @message.updated_at.strftime("%I:%M %p"),
            },
            user: user,
            notifications: notifications
          )
end
```

A similar setup was utilized for updating and deleting messages so that changes would be reflected for users in real-time

### Channels and Direct Messages (CRUD)

<img src="./app/assets/images/channel.gif" width=750px/>

Users can create, edit, and delete public channels, private channels, direct messages, or group messages.
When creating one of the above, users are presented by a highly versitile modal component that not only renders but also stores relevant data.

Private channels and all direct message types include a user search feature that is throttled so that hits to the database are lessened.

The modal is a functional component that opens a specific form-modal based on information passed in:

```js
//frontend/components/modal.jsx
function Modal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal.type) {
    case "channel":
      component = <CreateChannelModalContainer />;
      break;
    case "dm":
      component = <CreateDmModalContainer />;
      break;
    case "delete":
      component = <DeleteChannelModalContainer />;
      break;
    case "update":
      component = <UpdateChannelModalContainer />;
      break;
    case "user":
      component = <UpdateUserForm />;
      break;
    default:
      return null;
  }
}
```

For example, when a user wants to create a new channel, a specific action is dispatched to the modal reducer, causing the modal to open the desired modal:

```js
//frontend/components/channel_index.jsx
const mapStateToProps = (state) => {
  return {
    modal: state.ui.modal,
    notifications: state.entities.notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openCreateModal: () => dispatch(openModal({ type: "channel" })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelIndex);
```

After clicking the create button for either modal form, associations and table rows to link users to these channels are then created.

### Message Notifications

<img src="./app/assets/images/notifications.gif" width=800px/>

When a user sends a message in a channel or direct message, all other users in that space will receive real time notifications that will pop up on their screens. The database stores a relational table called notifications that maps notifications to users and channels.

This code snippet shows how notifications are broadcasted to users:

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
           if (data.user) {
              let notification;
              for (let i = 0; i < data.notifications.length; i++) {
                if (data.notifications[i].user_id === this.props.currentUser) {
                  notification = data.notifications[i];
                }
              }
              let payload = {
                message: data.message,
                user: data.user,
                notification: notification,
              };
              this.props.receiveMessage(payload);
            }
          },
        }
}
```

Users can remove these notifications by visiting or typing in the channels.

## Additional Resources

- [Database Schema](https://github.com/dxu5/dlack/wiki/database-schema)
- [Frontend API Endpoints/Components](https://github.com/dxu5/dlack/wiki/frontend-routes-and-components)
- [Backend API Endpoints](https://github.com/dxu5/dlack/wiki/backend-routes)
- [Sample State](https://github.com/dxu5/dlack/wiki/sample-state)

---

### Have feedback or just want to chat? Send me an <a href="mailto:derek.j.xu@gmail.com">email</a>!
