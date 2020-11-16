import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store.js";
import Root from "./components/root.jsx";
import ReactGA from "react-ga";

function initializeReactGA() {
  ReactGA.initialize("G-JF0JPLLZHN");
  ReactGA.pageview("/");
}

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
        notifications: currentUser.notifications,
      },
      session: { currentUserId: currentUser.currentUser.id },
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  initializeReactGA();
  ReactDOM.render(<Root store={store} />, root);
});
