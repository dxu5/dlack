import { RECEIVE_CURRENT_USER } from "../actions/session_actions.js";
import { RECEIVE_CHANNEL_INFO } from "../actions/channel_actions";

const notificationsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return action.notifications;
    case RECEIVE_CHANNEL_INFO:
      Object.values(action.payload.notifications).forEach((notification) => {
        newState[notification.id] = notification;
      });
      return newState;
    default:
      return state;
  }
};

export default notificationsReducer;
