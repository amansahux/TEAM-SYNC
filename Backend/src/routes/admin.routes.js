import { Router } from "express";
import validate from "../middlewares/validate.middleware.js";
import { addEmployeeSchema } from "../validators/auth.validators.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";
import { addEmployee, deleteEmployee, editEmployee, getAllEmployee, toggleEmployeeStatus } from "../controllers/admin.controller.js";


const router = Router()

router.post("/add-employee", validate(addEmployeeSchema), authenticate, authorizeRoles("admin"), addEmployee);
router.get("/get-all-employee", authenticate, authorizeRoles("admin"), getAllEmployee)
router.put("/update-employee/:id", authenticate, authorizeRoles("admin"), editEmployee)
router.put("/toggle-status/:id", authenticate, authorizeRoles("admin"), toggleEmployeeStatus )
router.delete("/delete-employee/:id", authenticate, authorizeRoles("admin"), deleteEmployee)

export default router