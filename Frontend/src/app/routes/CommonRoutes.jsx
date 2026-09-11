import Home from "../../features/dashboard/ui/pages/Home.jsx";
import Setting from "../../features/settings/ui/page/Setting.jsx";
import { chatRoutes } from "./ChatRoutes.jsx";

export const commonRoutes = [
  {
    path: "",
    element: <Home />,
  },
  ...chatRoutes,
  {
    path: "setting",
    element: <Setting />,
  },
];