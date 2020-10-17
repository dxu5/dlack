import * as MessageAPIUtil from "../util/message_api_util.js";

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";
export const UPDATE_MESSAGE = "UPDATE_MESSAGE";

export const receiveMessage = (payload) => {
  return {
    type: RECEIVE_MESSAGE,
    payload,
  };
};

export const receiveUpdateMessage = (message) => {
  return {
    type: UPDATE_MESSAGE,
    message,
  };
};

export const removeMessage = (messageId) => {
  return {
    type: REMOVE_MESSAGE,
    messageId,
  };
};

//change to action cable!

export const createMessage = (message) => (dispatch) => {
  return MessageAPIUtil.createMessage(message);
};

export const deleteMessage = (messageId) => (dispatch) => {
  return MessageAPIUtil.deleteMessage(messageId);
};

export const updateMessage = (message) => (dispatch) => {
  return MessageAPIUtil.updateMessage(message);
};
