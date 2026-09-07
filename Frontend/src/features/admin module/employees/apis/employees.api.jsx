import axiosInstance from "../../../../app/config/axiosInstance";
export const getAllEmployees = async (page = 1, limit = 20) => {
  const response = await axiosInstance.get(
    `/admin/get-all-employee?limit=${limit}&page=${page}`,
  );
  return response.data.data;
};
