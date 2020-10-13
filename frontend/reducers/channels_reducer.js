import { RECEIVE_CURRENT_USER } from "../actions/session_actions.js";
import { RECEIVE_CHANNEL } from "../actions/channel_actions.js";

const channelsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return action.channels;
    case RECEIVE_CHANNEL:
      newState[action.channel.id] = action.channel;
      return newState;
    default:
      return state;
  }
};

export default channelsReducer;
