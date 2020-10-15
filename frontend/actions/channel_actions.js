import * as ChannelAPIUtil from "../util/channel_api_util.js";
import { receiveErrors } from "./session_actions.js";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const RECEIVE_CHANNEL_INFO = "RECEIVE_CHANNEL_INFO";
export const DELETE_CHANNEL = "DELETE_CHANNEL";

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

export const deleteChannel = (channelId) => {
  return {
    type: DELETE_CHANNEL,
    channelId,
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

export const updateChannel = (channel) => (dispatch) => {
  return ChannelAPIUtil.updateChannel(channel).then(
    (channel) => {
      dispatch(receiveChannel(channel));
    },
    (errors) => {
      dispatch(receiveErrors(errors.responseJSON));
    }
  );
};

export const getChannelInfo = (channelId) => (dispatch) => {
  return ChannelAPIUtil.fetchChannel(channelId).then((payload) => {
    dispatch(receiveChannelInfo(payload));
  });
};

export const destroyChannel = (channelId) => (dispatch) => {
  return ChannelAPIUtil.deleteChannel(channelId).then(() => {
    dispatch(deleteChannel(channelId));
  });
};
