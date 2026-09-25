import {
  getTaskService,
  taskDetailService,
  updateTaskStatusService,
} from "../services/employee.task.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getTask = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || "";
  const status = req.query.status || "";
  const priority = req.query.priority || "";

  const { tasks, totalTasks, metrics, totalPages, currentPage } = await getTaskService(
    req.user._id,
    { page, limit, search, status, priority }
  );

  res.status(200).json({
    success: true,
    message: "Tasks fetched successfully",
    data: {
      tasks,
      metrics,
      pagination: {
        total: totalTasks,
        page: currentPage,
        totalPages,
        limit,
      },
    },
  });
});

export const taskDetail = asyncHandler(async (req, res) => {
  const task = await taskDetailService(req.params.id, req.user._id);

  res.status(200).json({
    success: true,
    message: "Task detail fetched successfully",
    data: {
      task,
    },
  });
});

export const updateTaskStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const task = await updateTaskStatusService(req.params.id, req.user._id, status);

  res.status(200).json({
    success: true,
    message: "Task status updated successfully",
    data: {
      task,
    },
  });
});
