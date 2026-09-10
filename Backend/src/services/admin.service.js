import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import { sanitizeParam } from "../utils/SanitizeParam.js";

export const addEmployeeService = async (employeeData) => {
  const existingUser = await User.findOne({ email: employeeData.email });
  if (existingUser) {
    throw new AppError("User with this email already exists", 409);
  }

  const user = new User(employeeData);
  await user.save();

  return {
    user: user.toSafeObject(),
  };
};


export const getAllEmployeeService = async ({
  page = 1,
  limit = 10,
  search = "",
  department = "",
  status = "",
} = {}) => {
  const skip = (page - 1) * limit;

  const cleanSearch = sanitizeParam(search);
  const cleanDepartment = sanitizeParam(department).toLowerCase();
  const cleanStatus = sanitizeParam(status).toLowerCase();

  // Base query for employee role
  const query = { role: "employee" };

  // Filter by department (developer, designer, manager, marketer, common)
  // Ignore if "all", "all departments", or empty
  if (
    cleanDepartment &&
    cleanDepartment !== "all" &&
    cleanDepartment !== "all departments"
  ) {
    query.department = cleanDepartment;
  }

  // Filter by status (active, inactive)
  // Ignore if "all", "status: all", or empty
  if (
    cleanStatus &&
    cleanStatus !== "all" &&
    cleanStatus !== "status: all"
  ) {
    query.status = cleanStatus;
  }

  // Search by name or email
  if (cleanSearch) {
    const searchRegex = new RegExp(cleanSearch, "i");
    query.$or = [{ name: searchRegex }, { email: searchRegex }];
  }

  const employees = await User.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalEmployees = await User.countDocuments(query);

  return {
    employees,
    totalEmployees,
    totalPages: Math.ceil(totalEmployees / limit) || 1,
    currentPage: page,
  };
};
export const editEmployeeService = async (employeeId, employeeData) => {
  const existingEmployee = await User.findById(employeeId);
  if (!existingEmployee) {
    throw new AppError("Employee not found", 404);
  }

  const updatedEmployee = await User.findByIdAndUpdate(employeeId, employeeData, {
    new: true,
    runValidators: true,
  });

  return {
    employee: updatedEmployee.toSafeObject(),
  };
};
export const deleteEmployeeService = async (employeeId) => {
  const existingEmployee = await User.findById(employeeId);
  if (!existingEmployee) {
    throw new AppError("Employee not found", 404);
  }

  await User.findByIdAndDelete(employeeId);

  return true;
};
