import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/token.js";

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  if (user.status !== "active") {
    throw new AppError("Your account is currently inactive", 403);
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new AppError("Invalid credentials", 401);
  }

  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id });

  user.refreshToken = refreshToken;
  await user.save();

  return {
    user: user.toSafeObject(),
    accessToken,
    refreshToken,
  };
};

export const getCurrentUserService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.status !== "active") {
    throw new AppError("Your account is currently inactive", 403);
  }

  return {
    user: user.toSafeObject(),
  };
};

export const refreshAccessTokenService = async (providedRefreshToken) => {
  if (!providedRefreshToken) {
    throw new AppError("Refresh token is required", 401);
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(providedRefreshToken);
  } catch (error) {
    throw new AppError("Invalid or expired refresh token", 401);
  }

  const user = await User.findById(decoded.id).select("+refreshToken");
  if (!user) {
    throw new AppError("Invalid token user not found", 401);
  }

  if (user.status !== "active") {
    throw new AppError("Your account is currently inactive", 403);
  }

  if (user.refreshToken !== providedRefreshToken) {
    throw new AppError("Invalid or stale refresh token", 401);
  }

  // Generate new tokens (Token rotation)
  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const newRefreshToken = generateRefreshToken({ id: user._id });

  user.refreshToken = newRefreshToken;
  await user.save();

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

export const logoutService = async (userId) => {
  if (userId) {
    await User.findByIdAndUpdate(userId, { refreshToken: null });
  }
  return true;
};
