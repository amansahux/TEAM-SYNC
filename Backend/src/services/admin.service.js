import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

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
export const getAllEmployeeService = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const employees = await User.find({ role: "employee" })
    .skip(skip)
    .limit(limit);

  const totalEmployees = await User.countDocuments({ role: "employee" });

  return {
    employees,
    totalEmployees,
    totalPages: Math.ceil(totalEmployees / limit),
    currentPage: page,
  };
};
