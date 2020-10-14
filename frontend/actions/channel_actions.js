import * as ChannelAPIUtil from "../util/channel_api_util.js";
import { receiveErrors } from "./session_actions.js";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const RECEIVE_CHANNEL_INFO = "RECEIVE_CHANNEL_INFO";

export const receiveChannel = (channel) => {
  return {
    type: RECEIVE_CHANNEL,
    channel,
  };
};

export const receiveChannelInfo = (payload) => {
  return {
    type: RECEIVE_CHANNEL_INFO,
    payload,
  };
};

export const createChannel = (channel) => (dispatch) => {
  return ChannelAPIUtil.createChannel(channel).then(
    (channel) => {
      dispatch(receiveChannel(channel));
    },
    (errors) => dispatch(receiveErrors(errors.responseJSON))
  );
};

export const getChannelInfo = (channelId) => (dispatch) => {
  return ChannelAPIUtil.fetchChannel(channelId).then((payload) => {
    debugger;
    dispatch(receiveChannelInfo(payload));
  });
};
