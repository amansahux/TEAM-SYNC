import { addEmployeeService } from "../services/admin.service.js";
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
    
})