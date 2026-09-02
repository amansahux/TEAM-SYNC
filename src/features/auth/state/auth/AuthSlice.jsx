import { createSlice } from "@reduxjs/toolkit";
import { getCurrentEmployee, LoginEmployee } from "./AuthAction";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    employee: null,
    Loading: false,
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
        state.Loading = true;
        state.error = null;
      })
      .addCase(LoginEmployee.fulfilled, (state, action) => {
        state.Loading = false;
        state.employee = action.payload;
      })
      .addCase(LoginEmployee.rejected, (state, action) => {
        state.Loading = false;
        state.error = action.payload.message;
      })
      .addCase(getCurrentEmployee.pending, (state) => {
        state.Loading = true;
        state.error = null;
      })
      .addCase(getCurrentEmployee.fulfilled, (state, action) => {
        state.Loading = false;
        state.employee = action.payload;
      })
      .addCase(getCurrentEmployee.rejected, (state, action) => {
        state.Loading = false;
        state.error = action.payload.message;
      });
  },
});
export default authSlice.reducer;
export const { addEmployee, removeEmployee } = authSlice.actions;
