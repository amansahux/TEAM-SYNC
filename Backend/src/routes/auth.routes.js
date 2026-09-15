import express from "express";
import {
  login,
  getMe,
  getAccessToken,
  logout,
  resetPassword,
  uploadAvtar,
  updateName,
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
router.put("/reset-password", authenticate, resetPassword);
router.put("/upload-avtar", authenticate, upload.single("avatar"), uploadAvtar);
router.put("/update-name", authenticate, updateName);

export default router;
