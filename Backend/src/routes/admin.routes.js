import { Router } from "express";
import validate from "../middlewares/validate.middleware.js";
import { addEmployeeSchema } from "../validators/auth.validators.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";
import {
  addEmployee,
  createTask,
  deleteEmployee,
  deleteTask,
  editEmployee,
  getAllEmployee,
  getAllTask,
  getDepartment,
  getDepartmentDetail,
  toggleEmployeeStatus,
  updateTask,
} from "../controllers/admin.controller.js";


const router = Router();

router.post("/add-employee", validate(addEmployeeSchema), authenticate, authorizeRoles("admin"), addEmployee);
router.get("/get-all-employee", authenticate, authorizeRoles("admin"), getAllEmployee);
router.put("/update-employee/:id", authenticate, authorizeRoles("admin"), editEmployee);
router.put("/toggle-status/:id", authenticate, authorizeRoles("admin"), toggleEmployeeStatus);
router.delete("/delete-employee/:id", authenticate, authorizeRoles("admin"), deleteEmployee);

router.get("/department", authenticate, authorizeRoles("admin"), getDepartment);

router.get("/department/:department", authenticate, authorizeRoles("admin"), getDepartmentDetail);

router.get("/tasks", authenticate, authorizeRoles("admin"), getAllTask);
router.post("/create-task", authenticate, authorizeRoles("admin"), createTask);
router.put("/update-task/:id", authenticate, authorizeRoles("admin"), updateTask);
router.delete("/delete-task/:id", authenticate, authorizeRoles("admin"), deleteTask);

export default router;