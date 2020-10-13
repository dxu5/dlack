import * as ChannelAPIUtil from "../util/channel_api_util.js";
import { receiveErrors } from "./session_actions.js";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";

export const receiveChannel = (channel) => {
  return {
    type: RECEIVE_CHANNEL,
    channel,
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
