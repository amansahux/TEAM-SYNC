import express from "express";
import {
  login,
  addEmployee,
  getMe,
  getAccessToken,
  logout,
} from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";
import {
  loginSchema,
  addEmployeeSchema,
} from "../validators/auth.validators.js";

const router = express.Router();

router.post("/login", validate(loginSchema), login);
router.post("/add-employee", validate(addEmployeeSchema), authenticate, authorizeRoles("admin"),  addEmployee);
router.get("/me", authenticate, getMe);
router.get("/get-accessToken", getAccessToken);
router.post("/logout", authenticate, logout);

export default router;
