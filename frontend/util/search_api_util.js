export const searchUsers = (search) => {
  return $.ajax({
    method: "GET",
    url: "/api/users",
    data: {
      search,
    },
  });
};
