import Task from "../models/task.model.js";
import AppError from "../utils/AppError.js";
import { sanitizeParam } from "../utils/SanitizeParam.js";

export const getTaskService = async (employeeId, {
  page = 1,
  limit = 10,
  search = "",
  status = "",
  priority = "",
} = {}) => {
  const skip = (page - 1) * limit;

  const cleanSearch = sanitizeParam(search);
  const cleanStatus = sanitizeParam(status).toLowerCase();
  const cleanPriority = sanitizeParam(priority).toLowerCase();

  const query = { assignedTo: employeeId };

  if (cleanStatus && cleanStatus !== "all" && cleanStatus !== "status: all") {
    query.status = cleanStatus;
  }

  if (cleanPriority && cleanPriority !== "all" && cleanPriority !== "priority: all") {
    query.priority = cleanPriority;
  }

  if (cleanSearch) {
    const searchRegex = new RegExp(cleanSearch, "i");
    query.$or = [{ title: searchRegex }, { description: searchRegex }];
  }

  const tasks = await Task.find(query)
    .populate("assignedBy", "name email avatar role")
    .populate("assignedTo", "name email avatar department role")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalTasks = await Task.countDocuments(query);
  const todoTasks = await Task.countDocuments({ assignedTo: employeeId, status: "todo" });
  const inProgressTasks = await Task.countDocuments({ assignedTo: employeeId, status: "in-progress" });
  const completedTasks = await Task.countDocuments({ assignedTo: employeeId, status: "completed" });

  return {
    tasks,
    totalTasks,
    metrics: {
      todo: todoTasks,
      inProgress: inProgressTasks,
      completed: completedTasks,
    },
    totalPages: Math.ceil(totalTasks / limit) || 1,
    currentPage: page,
  };
};

export const taskDetailService = async (taskId, employeeId) => {
  const task = await Task.findById(taskId)
    .populate("assignedBy", "name email avatar role")
    .populate("assignedTo", "name email avatar department role");

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  // Ensure employee can only view tasks assigned to them
  if (task.assignedTo._id.toString() !== employeeId.toString()) {
    throw new AppError("You are not authorized to view this task", 403);
  }

  return task;
};

export const updateTaskStatusService = async (taskId, employeeId, status) => {
  const validStatuses = ["todo", "in-progress", "completed"];
  if (!status || !validStatuses.includes(status)) {
    throw new AppError("Invalid status. Allowed values are 'todo', 'in-progress', 'completed'", 400);
  }

  const task = await Task.findById(taskId);
  if (!task) {
    throw new AppError("Task not found", 404);
  }

  // Ensure employee can only update status of tasks assigned to them
  if (task.assignedTo.toString() !== employeeId.toString()) {
    throw new AppError("You are not authorized to update this task", 403);
  }

  task.status = status;
  await task.save();

  const populatedTask = await Task.findById(task._id)
    .populate("assignedBy", "name email avatar role")
    .populate("assignedTo", "name email avatar department role");

  return populatedTask;
};
