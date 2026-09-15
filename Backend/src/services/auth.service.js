import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import uploadFile from "../config/storage.js";
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
    throw new AppError("Invalid or expired refresh token", 400);
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


export const resetPasswordService = async ({ userId, currentPassword, newPassword, confirmNewPassword }) => {

  const user = await User.findById(userId).select("+password");
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isPasswordValid = await user.comparePassword(currentPassword);
  if (!isPasswordValid) {
    throw new AppError("Invalid current password", 401);
  }

  if (newPassword !== confirmNewPassword) {
    throw new AppError("New passwords do not match", 400);
  }

  if (currentPassword === newPassword) {
    throw new AppError("New password must be different from current password", 400);
  }

  user.password = newPassword;
  await user.save();

  return {
    message: "Password reset successfully",
  };
};

export const uploadAvtarService = async ({ userId, file }) => {
  try {
    if (!file) {
      throw new AppError("File is required", 400);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Remove existing avatar if any
    if (user.avatar) {
      await removeFile(user.avatar);
    }

    // Upload new avatar
    const uploaded = await uploadFile(file, 'avatar', "TEAM_SYNC/avatars");
    user.avatar = uploaded.url;
    await user.save();

    return { avatar: uploaded.url };

  } catch (error) {
    throw error;
  }
}
export const updateNameService = async ({ userId, name }) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    if (!name) {
      throw new AppError("Name is required", 400);
    }
    user.name = name;
    await user.save();
    return { user: user.toSafeObject() };
  } catch (error) {
    throw error;
  }
}
