import * as ChannelAPIUtil from "../util/channel_api_util.js";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";

export const receiveChannel = (channel) => {
  return {
    type: RECEIVE_CHANNEL,
    channel,
  };
};

export const createChannel = (channel) => (dispatch) => {
  return ChannelAPIUtil.createChannel(channel).then((channel) => {
    dispatch(receiveChannel(channel));
  });
};
