import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MessageIndex from "./message_index.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    messages: findMessages(
      state.entities.messages,
      ownProps.match.params.channelId
    ),
    users: findUsers(
      state.entities.messages,
      ownProps.match.params.channelId,
      state.entities.users
    ),
  };
};

const findUsers = (messages, currentChannel, users) => {
  let channelUsers = {};
  for (const message in messages) {
    if (messages[message].channel_id === Number(currentChannel)) {
      let user = users[messages[message].author_id];
      channelUsers[user.id] = user;
    }
  }
  return user;
};

const findMessages = (messages, currentChannel) => {
  let finalMessages = {};
  for (const message in messages) {
    if (messages[message].channel_id === Number(currentChannel)) {
      finalMessages[messages[message].id] = messages[message];
    }
  }
  return finalMessages;
};

export default withRouter(connect(mapStateToProps, null)(MessageIndex));
