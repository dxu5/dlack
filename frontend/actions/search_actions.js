export const RECEIVE_USERS_SEARCH = "RECEIVE_USERS_SEARCH";

export const receiveUsersSearch = (users) => {
  return {
    type: RECEIVE_USERS_SEARCH,
    users,
  };
};
