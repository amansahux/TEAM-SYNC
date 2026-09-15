import axiosInstance from "../../../app/config/axiosInstance";

export const updatePassword = async (
  currentPassword,
  newPassword,
  confirmNewPassword,
) => {
  const response = await axiosInstance.put("/api/auth/reset-password", {
    currentPassword,
    newPassword,
    confirmNewPassword,
  });
  return response.data;
};

export const uploadAvtar = async () => {
    const file = new FormData();
    file.append("avatar", file);
  const response = await axiosInstance.put("/api/auth/upload-avatar", file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateName = async (name) => {
  const response = await axiosInstance.put("/api/auth/update-name", { name });
  return response.data;
};
