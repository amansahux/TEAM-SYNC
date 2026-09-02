import { createSlice } from "@reduxjs/toolkit";
const ThemeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: localStorage.getItem("theme") || "dark",
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
      localStorage.setItem("theme", state.mode);
    },
  },
});

export default ThemeSlice.reducer;
export const { toggleTheme } = ThemeSlice.actions;
