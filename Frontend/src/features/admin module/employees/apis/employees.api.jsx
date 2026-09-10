import axiosInstance from "../../../../app/config/axiosInstance";
export const getAllEmployees = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(
    `/admin/get-all-employee?limit=${limit}&page=${page}`,
  );
  return response.data.data;
};

export const addEmployee = async (employeeData) => {
  const response = await axiosInstance.post(
    `/admin/add-employee`,
    employeeData,
  );
  return response.data;
}