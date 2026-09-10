import { addEmployeeService, deleteEmployeeService, editEmployeeService, getAllEmployeeService, MarkActiveInactiveService } from "../services/admin.service.js";
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