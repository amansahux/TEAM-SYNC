import {
    addEmployeeService,
    createTaskService,
    deleteEmployeeService,
    deleteTaskService,
    editEmployeeService,
    getAllEmployeeService,
    getAllTaskService,
    GetDepartmentDetailService,
    getDepartmentService,
    MarkActiveInactiveService,
    updateTaskService,
} from "../services/admin.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const addEmployee = asyncHandler(async (req, res) => {
    const { user } = await addEmployeeService(req.body);

    res.status(201).json({
        success: true,
        message: "Employee added successfully",
        data: {
            user,
        },
    });
});

export const getAllEmployee = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const department = req.query.department || "";
    const status = req.query.status || "";

    const { employees, totalEmployees, activeEmployees, inactiveEmployees, newEmployees, totalPages, currentPage } =
        await getAllEmployeeService({ page, limit, search, department, status });

    res.status(200).json({
        success: true,
        message: "Employees fetched successfully",
        data: {
            employees,
            pagination: { limit: limit, total: totalEmployees, activeEmployees, inactiveEmployees, totalPages: totalPages, page: currentPage, newEmployees },
        },
    });
});

export const editEmployee = asyncHandler(async (req, res) => {
    const { user } = await editEmployeeService(req.params.id, req.body);

    res.status(200).json({
        success: true,
        message: "Employee updated successfully",
        data: {
            user,
        },
    });
});

export const deleteEmployee = asyncHandler(async (req, res) => {
    await deleteEmployeeService(req.params.id);

    res.status(200).json({
        success: true,
        message: "Employee deleted successfully",
    });
});

export const toggleEmployeeStatus = asyncHandler(async (req, res) => {
    const { user } = await MarkActiveInactiveService(req.params.id, req.body.status);

    res.status(200).json({
        success: true,
        message: "Employee status updated successfully",
        data: {
            user,
        },
    });
});

export const getDepartment = asyncHandler(async (req, res) => {
    const result = await getDepartmentService();

    res.status(200).json({
        success: true,
        message: "Departments fetched successfully",
        data: result,
    });
});
export const getDepartmentDetail = asyncHandler(async (req, res) => {
    const result = await GetDepartmentDetailService(req.params.department);
    res.status(200).json({
        success: true,
        message: "Department detail fetched successfully",
        data: result,
    });
});

export const getAllTask = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const status = req.query.status || "";
    const priority = req.query.priority || "";
    const assignedTo = req.query.assignedTo || "";

    const { tasks, totalTasks, metrics, totalPages, currentPage } = await getAllTaskService({
        page,
        limit,
        search,
        status,
        priority,
        assignedTo,
    });

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

export const createTask = asyncHandler(async (req, res) => {
    const task = await createTaskService(req.body, req.user._id);

    res.status(201).json({
        success: true,
        message: "Task created and assigned successfully",
        data: {
            task,
        },
    });
});

export const updateTask = asyncHandler(async (req, res) => {
    const updatedTask = await updateTaskService(req.params.id, req.body);

    res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: {
            task: updatedTask,
        },
    });
});

export const deleteTask = asyncHandler(async (req, res) => {
    const result = await deleteTaskService(req.params.id);

    res.status(200).json({
        success: true,
        message: result.message || "Task deleted successfully",
    });
});