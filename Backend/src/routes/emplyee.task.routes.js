import { Router } from "express";
import { getTask, taskDetail, updateTaskStatus } from "../controllers/employee.task.controller";

const router = Router()

router.get("/tasks", authenticate, authorizeRoles("employee"), getTask)
router.get("/task/:id", authenticate, authorizeRoles("employee"), taskDetail)
router.put("/task/:id", authenticate, authorizeRoles("employee"), updateTaskStatus)

export default router