import { Router } from "express";
import { getMessages } from "../controllers/chat.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/get-messages", authenticate, getMessages);
router.get("/get-messages/:channel", authenticate, getMessages);

export default router;