import React from "react";
import { useDispatch } from "react-redux";
import { LoginEmployee } from "../state/auth/AuthAction";
import { useForm } from "react-hook-form";

const useAuth = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
