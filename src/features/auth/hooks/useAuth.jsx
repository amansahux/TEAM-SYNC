import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const handleLoginSubmit = (credentials) => {
    handleLogin(credentials);
  };
  const handleRegister = (data) => {
    console.log("Register data:", data);
  };
  const handleRegisterSubmit = (data) => {
    handleRegister(data);
  }
  const loading = useSelector((state) => state.auth.Loading);

  return {
    handleLoginSubmit,
    register,
    handleSubmit,
    loading,
    errors,
    handleRegisterSubmit,
  };
};

export default useAuth;
