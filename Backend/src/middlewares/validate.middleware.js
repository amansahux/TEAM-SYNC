import AppError from "../utils/AppError.js";

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error.name === "ZodError" || error.issues) {
        const formattedErrors = {};
        error.issues?.forEach((issue) => {
          const path = issue.path.join(".") || "body";
          formattedErrors[path] = issue.message;
        });

        return next(
          new AppError("Validation failed", 400, formattedErrors)
        );
      }
      next(error);
    }
  };
};

export default validate;
