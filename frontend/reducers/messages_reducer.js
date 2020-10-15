import { RECEIVE_CHANNEL_INFO } from "../actions/channel_actions";

const messagesReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CHANNEL_INFO:
      Object.values(action.payload.messages).forEach((message) => {
        newState[message.id] = message;
      });
      return newState;
    default:
      return state;
  }
};

export default messagesReducer;
