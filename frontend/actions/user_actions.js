import * as UserAPIUtil from "../util/user_api_util.js";
import { receiveErrors } from "./session_actions.js";

export const UPDATE_USER = "UPDATE_USER";

export const receiveUpdateUser = (payload) => {
  return {
    type: UPDATE_USER,
    payload,
  };
};

export const updateUser = (user, id) => (dispatch) => {
  return UserAPIUtil.updateUser(user, id).then(
    (payload) => {
      dispatch(receiveUpdateUser(payload));
    },
    (errors) => dispatch(receiveErrors(errors.responseJSON))
  );
};
