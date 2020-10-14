import { combineReducers } from "redux";
import usersReducer from "./users_reducer.js";
import channelsReducer from "./channels_reducer.js";
import userChannelsReducer from "./user_channels_reducer.js";

const entitiesReducer = combineReducers({
  users: usersReducer,
  channels: channelsReducer,
  userChannels: userChannelsReducer,
});

export default entitiesReducer;
