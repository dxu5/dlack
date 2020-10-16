import * as MessageAPIUtil from "../util/message_api_util.js";

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";

export const receiveMessage = (payload) => {
  return {
    type: RECEIVE_MESSAGE,
    payload,
  };
};

//change to action cable!

export const createMessage = (message) => (dispatch) => {
  return MessageAPIUtil.createMessage(message);
};
