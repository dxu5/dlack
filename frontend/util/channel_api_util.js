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

export const deleteChannel = (channelId) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/channels/${channelId}`,
  });
};
