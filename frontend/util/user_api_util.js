export const updateUser = (formData, id) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/users/${id}`,
    data: formData,
    contentType: false,
    processData: false,
  });
};
