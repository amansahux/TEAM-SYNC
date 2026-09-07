import { addEmployeeService, getAllEmployeeService } from "../services/admin.service.js";
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

    const { employees, totalEmployees, totalPages, currentPage } = await getAllEmployeeService(page, limit);

    res.status(200).json({
        success: true,
        message: "Employees fetched successfully",
        data: { employees, pagination: { limit: limit, total: totalEmployees, totalPages: totalPages, page: currentPage } },

    });
});