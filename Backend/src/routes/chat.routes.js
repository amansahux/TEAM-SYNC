import { Router } from "express";
import { getMessages, uploadFileController } from "../controllers/chat.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/get-messages", authenticate, getMessages);
router.get("/get-messages/:channel", authenticate, getMessages);
router.post("/upload", authenticate, upload.array("files"), uploadFileController);

export default router;