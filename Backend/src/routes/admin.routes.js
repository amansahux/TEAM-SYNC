import { Router } from "express";
import validate from "../middlewares/validate.middleware.js";
import { addEmployeeSchema } from "../validators/auth.validators.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";
import { addEmployee } from "../controllers/admin.controller.js";


const router = Router()

router.post("/add-employee", validate(addEmployeeSchema), authenticate, authorizeRoles("admin"), addEmployee);

export default router