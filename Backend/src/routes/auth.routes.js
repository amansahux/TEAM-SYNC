import express from "express";
import {
  login,
  getMe,
  getAccessToken,
  logout,
  updateProfile,
  resetPassword,
} from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  loginSchema,
} from "../validators/auth.validators.js";

import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/login", validate(loginSchema), login);

router.get("/me", authenticate, getMe);
router.get("/get-accessToken", getAccessToken);
router.post("/logout", authenticate, logout);
router.put("/update-profile", authenticate, upload.single("avatar"), updateProfile);
router.put("/reset-password", authenticate, resetPassword);

export default router;
