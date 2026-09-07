import express from "express";
import {
  login,
  getMe,
  getAccessToken,
  logout,
} from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  loginSchema,
} from "../validators/auth.validators.js";

const router = express.Router();

router.post("/login", validate(loginSchema), login);

router.get("/me", authenticate, getMe);
router.get("/get-accessToken", getAccessToken);
router.post("/logout", authenticate, logout);

export default router;
