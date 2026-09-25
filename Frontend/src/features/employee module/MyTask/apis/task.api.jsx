import axiosInstance from "../../../../app/config/axiosInstance";

export const getEmployeeTasks = async ({
  page = 1,
  limit = 10,
  search = "",
  status = "",
  priority = "",
} = {}) => {
  const params = new URLSearchParams({ page, limit });
  if (search) params.append("search", search);
  if (status && status !== "all") params.append("status", status);
  if (priority && priority !== "all") params.append("priority", priority);

  const response = await axiosInstance.get(`/employee/tasks?${params.toString()}`);
  return response.data.data;
};

export const getEmployeeTaskDetail = async (taskId) => {
  const response = await axiosInstance.get(`/employee/task/${taskId}`);
  return response.data.data;
};

export const updateEmployeeTaskStatus = async (taskId, status) => {
  const response = await axiosInstance.put(`/employee/task/${taskId}`, { status });
  return response.data;
};
