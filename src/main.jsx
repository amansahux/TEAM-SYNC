import { createRoot } from "react-dom/client";
import AppRoutes from "./app/Routes/AppRoutes.jsx";
import { Provider } from "react-redux";
import store from "./app/app.store.jsx";
import "./app/App.css"

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
);
