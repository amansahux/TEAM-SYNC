import AppError from "../utils/AppError.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  // Set default values
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal Server Error";

  // Handle Mongoose CastError (Invalid ID)
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new AppError(message, 404);
  }

  // Handle Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    const value = err.keyValue ? err.keyValue[field] : "";
    const message = `${field.charAt(0).toUpperCase() + field.slice(1)} '${value}' already exists`;
    error = new AppError(message, 409);
  }

  // Handle Mongoose ValidationError
  if (err.name === "ValidationError") {
    const formattedErrors = {};
    Object.keys(err.errors).forEach((key) => {
      formattedErrors[key] = err.errors[key].message;
    });
    error = new AppError("Validation failed", 400, formattedErrors);
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    error = new AppError("Invalid authentication token", 401);
  }

  // Handle JWT Expired error
  if (err.name === "TokenExpiredError") {
    error = new AppError("Authentication token expired", 401);
  }

  const response = {
    success: false,
    message: error.message,
  };

  if (error.errors) {
    response.errors = error.errors;
  }

  res.status(error.statusCode).json(response);
};

export default errorHandler;
