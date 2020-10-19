import * as SessionAPIUtil from "../util/session_api_util.js";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const receiveCurrentUser = ({
  currentUser,
  channels,
  notifications,
}) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser,
    channels,
    notifications,
  };
};

export const logoutCurrentUser = () => {
  return {
    type: LOGOUT_CURRENT_USER,
  };
};

export const receiveErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors,
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

export const signup = (user) => (dispatch) => {
  return SessionAPIUtil.signup(user).then(
    (res) => dispatch(receiveCurrentUser(res)),
    (errors) => dispatch(receiveErrors(errors.responseJSON))
  );
};

export const login = (user) => (dispatch) => {
  return SessionAPIUtil.login(user).then(
    (res) => dispatch(receiveCurrentUser(res)),
    (errors) => dispatch(receiveErrors(errors.responseJSON))
  );
};

export const logout = () => (dispatch) => {
  return SessionAPIUtil.logout().then(
    () => dispatch(logoutCurrentUser()),
    (errors) => dispatch(receiveErrors(errors.responseJSON))
  );
};
