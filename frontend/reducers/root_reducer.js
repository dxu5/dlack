import { combineReducers } from "redux";
import entitiesReducer from "./entities_reducer.js";
import sessionReducer from "./session_reducer.js";

const rootReducer = combineReducers({
  entities: entitiesReducer,
  session: sessionReducer,
});

export default rootReducer;
