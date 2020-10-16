import { RECEIVE_CHANNEL_INFO } from "../actions/channel_actions";
import {
  RECEIVE_MESSAGE,
  REMOVE_MESSAGE,
  UPDATE_MESSAGE,
} from "../actions/message_actions.js";

const messagesReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CHANNEL_INFO:
      if (action.payload.messages) {
        Object.values(action.payload.messages).forEach((message) => {
          newState[message.id] = message;
        });
      }
      return newState;
    case RECEIVE_MESSAGE:
      newState[action.payload.message.id] = action.payload.message;
      return newState;
    case REMOVE_MESSAGE:
      delete newState[action.messageId];
      return newState;
    case UPDATE_MESSAGE:
      newState[action.message.id] = action.message;
      return newState;
    default:
      return state;
  }
};

export default messagesReducer;
