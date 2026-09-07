import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../app/config/axiosInstance";

export const LoginEmployee = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Unable to sign in"
      );
    }
  },
);

export const getCurrentEmployee = createAsyncThunk(
  "auth/me",
  async (_, thunkApi) => {
    try {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Unable to restore your session"
      );
    }
  },
);

export const LogoutEmployee = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Unable to sign out"
      );
    }
  }
);
