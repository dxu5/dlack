import { RECEIVE_CURRENT_USER } from "../actions/session_actions.js";
import { RECEIVE_USERS_SEARCH } from "../actions/search_actions.js";
import { RECEIVE_CHANNEL_INFO } from "../actions/channel_actions.js";
const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState[action.currentUser.id] = action.currentUser;
      return newState;
    case RECEIVE_USERS_SEARCH:
      Object.values(action.users).forEach((user) => {
        newState[user.id] = user;
      });
      return newState;
    case RECEIVE_CHANNEL_INFO:
      Object.values(action.payload.users).forEach((user) => {
        newState[user.id] = user;
      });
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
