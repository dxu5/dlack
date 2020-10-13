import * as SearchAPIUtil from "../util/search_api_util.js";
export const RECEIVE_USERS_SEARCH = "RECEIVE_USERS_SEARCH";

export const receiveUsersSearch = (users) => {
  return {
    type: RECEIVE_USERS_SEARCH,
    users,
  };
};

export const SearchUsers = (search) => (dispatch) => {
  return SearchAPIUtil.searchUsers(search).then((users) =>
    dispatch(receiveUsersSearch(users))
  );
};
