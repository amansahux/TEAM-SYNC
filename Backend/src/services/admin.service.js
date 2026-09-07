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