import axiosInstance from "../../../../app/config/axiosInstance";

export const getDepartments = async () => {
  const response = await axiosInstance.get("/admin/department");
  return response.data.data;
};
