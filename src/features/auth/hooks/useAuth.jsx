import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { LoginEmployee } from "../state/auth/AuthAction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RegisterEmployee } from "../apis/auth.api";

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
  const { isLoggingIn } = useSelector((state) => state.auth);
  const [isRegistering, setIsRegistering] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });
  const navigate = useNavigate();
  const handleLogin = (credentials) => {
    dispatch(LoginEmployee(credentials));
  };
  const handleRegister = async (data) => {
    setIsRegistering(true);
    try {
      const res = await RegisterEmployee(data);
      reset();
      navigate("/");
      return res;
    } finally {
      setIsRegistering(false);
    }
  };

  return {
    register,
    handleSubmit,
    handleRegister,
    handleLogin,
    errors,
    isLoggingIn,
    isRegistering,
  };
};

export default useAuth;
