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
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getCurrentEmployee = createAsyncThunk(
  "auth/me",
  async (_, thunkApi) => {
    try {
      const res = await axiosInstance.get("/auth/me");
      // console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
