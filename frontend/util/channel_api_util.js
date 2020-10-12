import { $CombinedState } from "redux";

export const fetchChannel = (channelId) => {
  return $.ajax({
    method: "GET",
    url: `/api/channels/${channelId}`,
  });
};
