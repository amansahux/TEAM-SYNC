import axiosInstance from "../../../../app/config/axiosInstance";

export const getAllTasks = async ({
  page = 1,
  limit = 10,
  search = "",
  status = "",
  priority = "",
  assignedTo = "",
} = {}) => {
  const params = new URLSearchParams({ page, limit });
  if (search) params.append("search", search);
  if (status && status !== "all") params.append("status", status);
  if (priority && priority !== "all") params.append("priority", priority);
  if (assignedTo && assignedTo !== "all") params.append("assignedTo", assignedTo);

  const response = await axiosInstance.get(`/admin/tasks?${params.toString()}`);
  return response.data.data;
};

export const createTask = async (taskData) => {
  const response = await axiosInstance.post("/admin/create-task", taskData);
  return response.data;
};

export const updateTask = async (taskId, taskData) => {
  const response = await axiosInstance.put(`/admin/update-task/${taskId}`, taskData);
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await axiosInstance.delete(`/admin/delete-task/${taskId}`);
  return response.data;
};
