import { $CombinedState } from "redux";

export const fetchChannel = (channelId) => {
  return $.ajax({
    method: "GET",
    url: `/api/channels/${channelId}`,
  });
};

export const createChannel = (channel) => {
  return $.ajax({
    method: "POST",
    url: "/api/channels",
    data: {
      channel,
    },
  });
};
