import { RECEIVE_CURRENT_USER } from "../actions/session_actions.js";

const notificationsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return action.notifications;
    default:
      return state;
  }
};

export default notificationsReducer;
