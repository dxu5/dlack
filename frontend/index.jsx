import React from "react";
import ReactDOM from "react-dom";
import { login, logout, signup } from "./actions/session_actions.js";
import { searchUsers } from "./util/search_api_util";
import configureStore from "./store/store.js";
import Root from "./components/root.jsx";

document.addEventListener("DOMContentLoaded", () => {
  let root = document.getElementById("root");
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        channels: currentUser.channels,
        users: {
          [currentUser.currentUser.id]: currentUser.currentUser,
        },
      },
      session: { currentUserId: currentUser.currentUser.id },
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.login = login;
  window.logout = logout;
  window.signup = signup;
  window.searchUsers = searchUsers;
  ReactDOM.render(<Root store={store} />, root);
});
