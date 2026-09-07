import { createRoot } from "react-dom/client";
import AppRoutes from "./app/Routes/AppRoutes.jsx";
import { Provider } from "react-redux";
import store from "./app/app.store.jsx";
import "./app/App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const QUERYClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={QUERYClient}>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </QueryClientProvider>,
);
