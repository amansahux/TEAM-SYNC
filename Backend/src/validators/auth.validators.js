import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Invalid email format"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters long"),
});

export const addEmployeeSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(1, "Name cannot be empty"),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Invalid email format"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters long"),
  department: z.string().trim().optional(),
  role: z.enum(["admin", "employee"]).optional().default("employee"),
  status: z.enum(["active", "inactive"]).optional().default("active"),
  avatar: z.string().optional().default(""),
});
