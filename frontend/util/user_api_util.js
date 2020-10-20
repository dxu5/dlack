export const updateUser = (formData) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/users/${user.id}`,
    data: formData,
    contentType: false,
    processData: false,
  });
};
