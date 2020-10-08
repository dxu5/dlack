import React from "react";
import ReactDOM from "react-dom";
import { login, logout, signup } from "./actions/session_actions.js";
import configureStore from "./store/store.js";

document.addEventListener("DOMContentLoaded", () => {
  let root = document.getElementById("root");
  let store = configureStore();
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.login = login;
  window.logout = logout;
  window.signup = signup;
  ReactDOM.render(<h1>Dlack clone</h1>, root);
});
