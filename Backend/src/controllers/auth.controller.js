import asyncHandler from "../utils/asyncHandler.js";
import {
  loginService,
  addEmployeeService,
  getCurrentUserService,
  refreshAccessTokenService,
  logoutService,
} from "../services/auth.service.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await loginService(req.body);

  res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user,
      accessToken,
    },
  });
});

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

export const getMe = asyncHandler(async (req, res) => {
  const { user } = await getCurrentUserService(req.user._id);

  res.status(200).json({
    success: true,
    message: "Current user details fetched successfully",
    data: {
      user,
    },
  });
});

export const getAccessToken = asyncHandler(async (req, res) => {
  const providedRefreshToken =
    req.cookies?.refreshToken ||
    req.headers["x-refresh-token"] ||
    req.body?.refreshToken;

  const { accessToken, refreshToken: newRefreshToken } =
    await refreshAccessTokenService(providedRefreshToken);

  res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);

  res.status(200).json({
    success: true,
    message: "Access token generated successfully",
    data: {
      accessToken,
    },
  });
});

export const logout = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  await logoutService(userId);

  res.clearCookie("refreshToken", COOKIE_OPTIONS);

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
