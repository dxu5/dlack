export const createMessage = (message) => {
  return $.ajax({
    method: "POST",
    url: `/api/messages`,
    data: {
      message,
    },
  });
};

export const destroyMessage = (messageId) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/messages/${messageId}`,
  });
};
