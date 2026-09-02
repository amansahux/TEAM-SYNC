import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../features/auth/state/auth/AuthSlice";
import ThemeReducer from "../shared/state/Theme.slice";
const store = configureStore({
  reducer: {
    auth: AuthReducer,
    theme: ThemeReducer,
  },
});

export default store;
