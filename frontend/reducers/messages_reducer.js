import { RECEIVE_CHANNEL_INFO } from "../actions/channel_actions";
import { RECEIVE_MESSAGE } from "../actions/message_actions.js";

const messagesReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CHANNEL_INFO:
      Object.values(action.payload.messages).forEach((message) => {
        newState[message.id] = message;
      });
      return newState;
    case RECEIVE_MESSAGE:
      newState[action.message.id] = action.message;
      return newState;
    default:
      return state;
  }
};

export default messagesReducer;
