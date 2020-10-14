import { RECEIVE_CHANNEL_INFO } from "../actions/channel_actions.js";

const userChannelsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CHANNEL_INFO:
      Object.values(action.payload.userChannels).forEach((userChannel) => {
        newState[userChannel.id] = userChannel;
      });
      return newState;
    default:
      return state;
  }
};

export default userChannelsReducer;
