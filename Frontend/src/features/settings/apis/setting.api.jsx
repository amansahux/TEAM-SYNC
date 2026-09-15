import axiosInstance from "../../../app/config/axiosInstance";

export const updatePassword = async (
  currentPassword,
  newPassword,
  confirmNewPassword,
) => {
  const response = await axiosInstance.put("/auth/reset-password", {
    currentPassword,
    newPassword,
    confirmNewPassword,
  });
  return response.data;
};

export const uploadAvtar = async (file) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await axiosInstance.put("/auth/upload-avtar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateName = async (name) => {
  const response = await axiosInstance.put("/auth/update-name", { name });
  return response.data;
};
