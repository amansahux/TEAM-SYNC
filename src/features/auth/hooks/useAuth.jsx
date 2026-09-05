import { useDispatch } from "react-redux";
import { LoginEmployee } from "../state/auth/AuthAction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const useAuth = (schema) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });
  const handleLogin = (credentials) => {
    dispatch(LoginEmployee(credentials));
  };
  const handleRegister = (data) => {
    console.log("Register data:", data);
  };

  return {
    register,
    handleSubmit,
    handleRegister,
    handleLogin,
    errors,
  };
};

export default useAuth;
