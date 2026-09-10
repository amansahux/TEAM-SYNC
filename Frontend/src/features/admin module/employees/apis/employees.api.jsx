import axiosInstance from "../../../../app/config/axiosInstance";
export const getAllEmployees = async (
  page = 1,
  limit = 10,
  search = "",
  department = "",
  status = ""
) => {
  const params = new URLSearchParams({ page, limit });
  if (search) params.append("search", search);
  if (department) params.append("department", department);
  if (status) params.append("status", status);

  const response = await axiosInstance.get(
    `/admin/get-all-employee?${params.toString()}`
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