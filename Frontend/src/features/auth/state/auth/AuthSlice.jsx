import { createSlice } from "@reduxjs/toolkit";
import { getCurrentEmployee, LoginEmployee, LogoutEmployee } from "./AuthAction";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    employee: null,
    isHydrating: true,
    isLoggingIn: false,
    isLoggingOut: false,
    error: null,
  },
  reducers: {
    addEmployee: (state, action) => {
      state.employee = action.payload;
    },
    removeEmployee: (state) => {
      state.employee = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginEmployee.pending, (state) => {
        state.isLoggingIn = true;
        state.error = null;
      })
      .addCase(LoginEmployee.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.employee = action.payload;
      })
      .addCase(LoginEmployee.rejected, (state, action) => {
        state.isLoggingIn = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getCurrentEmployee.pending, (state) => {
        state.isHydrating = true;
        state.error = null;
      })
      .addCase(getCurrentEmployee.fulfilled, (state, action) => {
        state.isHydrating = false;
        state.employee = action.payload;
      })
      .addCase(getCurrentEmployee.rejected, (state, action) => {
        state.isHydrating = false;
        state.employee = null;
        state.error = action.payload || action.error.message;
      })
      .addCase(LogoutEmployee.pending, (state) => {
        state.isLoggingOut = true;
        state.error = null;
      })
      .addCase(LogoutEmployee.fulfilled, (state) => {
        state.isLoggingOut = false;
        state.employee = null;
      })
      .addCase(LogoutEmployee.rejected, (state, action) => {
        state.isLoggingOut = false;
        state.error = action.payload || action.error.message;
      });
  },
});
export default authSlice.reducer;
export const { addEmployee, removeEmployee } = authSlice.actions;
