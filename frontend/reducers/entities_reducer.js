import { combineReducers } from "redux";
import usersReducer from "./users_reducer.js";

const entitiesReducer = combineReducers({
  users: usersReducer,
});

export default entitiesReducer;
