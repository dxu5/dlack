import * as MessageAPIUtil from "../util/message_api_util.js";

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";

export const receiveMessage = (message) => {
  return {
    type: RECEIVE_MESSAGE,
    message,
  };
};

export const createMessage = (message) => {
  return MessageAPIUtil.createMessage(message).then((message) => {
    dispatch(receiveMessage(message));
  });
};
