import { RECEIVE_CURRENT_USER } from "../actions/session_actions.js";

const channelsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return action.channels;
    default:
      return state;
  }
};

export default channelsReducer;
