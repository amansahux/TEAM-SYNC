import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/token.js";
import User from "../models/user.model.js";

export const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Try cookie first
  if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }
  // 2. Fall back to Authorization header
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new AppError("Authentication required. Please provide a token.", 401);
  }

  let decoded;
  try {
    decoded = verifyAccessToken(token);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new AppError("Access token expired. Please refresh token.", 401);
    }
    throw new AppError("Invalid access token.", 401);
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new AppError("User belonging to this token no longer exists.", 401);
  }

  if (user.status !== "active") {
    throw new AppError("Your account is currently inactive.", 403);
  }

  req.user = user;
  next();
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new AppError(
          `User role '${req?.user?.role}' is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
