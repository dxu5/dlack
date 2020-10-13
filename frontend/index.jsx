import React from "react";
import ReactDOM from "react-dom";
import { login, logout, signup } from "./actions/session_actions.js";
import { searchUsers } from "./actions/search_actions.js";
import configureStore from "./store/store.js";
import Root from "./components/root.jsx";
import debounce from "./util/general_util.js";

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
  window.addEventListener(
    "resize",
    debounce(function () {
      console.log("wowowowowowow");
    }, 250)
  );
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.login = login;
  window.logout = logout;
  window.signup = signup;
  window.searchUsers = searchUsers;
  ReactDOM.render(<Root store={store} />, root);
});
