import { RECEIVE_CURRENT_USER } from "../actions/session_actions.js";
import {
  DELETE_CHANNEL,
  RECEIVE_CHANNEL_INFO,
  RECEIVE_CHANNEL,
} from "../actions/channel_actions";

const channelsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return action.channels;
    case RECEIVE_CHANNEL:
      newState[action.channel.channel.id] = action.channel.channel;
      return newState;
    case DELETE_CHANNEL:
      delete newState[action.channelId];
      return newState;
    case RECEIVE_CHANNEL_INFO:
      newState[action.payload.channel.id] = action.payload.channel;
      return newState;
    default:
      return state;
  }
};

export default channelsReducer;
