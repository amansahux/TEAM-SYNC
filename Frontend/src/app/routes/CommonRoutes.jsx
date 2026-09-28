import Setting from "../../features/settings/ui/page/Setting.jsx";
import { chatRoutes } from "./ChatRoutes.jsx";

export const commonRoutes = [

  ...chatRoutes,
  {
    path: "setting",
    element: <Setting />,
  },
];