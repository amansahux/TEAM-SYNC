import React from "react";
import GenralChat from "../../features/chats/ui/page/GenralChat.jsx";
import AnnouncementChat from "../../features/chats/ui/page/AnnouncementChat.jsx";
import DeveloperChat from "../../features/chats/ui/page/DeveloperChat.jsx";
import DesignerChat from "../../features/chats/ui/page/DesignerChat.jsx";
import ManagerChat from "../../features/chats/ui/page/ManagerChat.jsx";
import MarketerChat from "../../features/chats/ui/page/MarketerChat.jsx";
import DepartmentRoute from "../proectedRoutes/DepartmentRoute.jsx";

export const chatRoutes = [
  // 1. General Chat (Accessible by Everyone)
  {
    path: "chat",
    element: <GenralChat />,
  },
  {
    path: "chat/general",
    element: <GenralChat />,
  },

  // 2. Announcements Chat (Accessible by Everyone)
  {
    path: "chat/announcements",
    element: <AnnouncementChat />,
  },

  // 3. Developer Department Chat (Accessible by Developers & Admin)
  {
    element: <DepartmentRoute allowedDepartments={["developer"]} />,
    children: [
      {
        path: "chat/developers",
        element: <DeveloperChat />,
      },
    ],
  },

  // 4. Designer Department Chat (Accessible by Designers & Admin)
  {
    element: <DepartmentRoute allowedDepartments={["designer"]} />,
    children: [
      {
        path: "chat/designers",
        element: <DesignerChat />,
      },
    ],
  },

  // 5. Manager Department Chat (Accessible by Managers & Admin)
  {
    element: <DepartmentRoute allowedDepartments={["manager"]} />,
    children: [
      {
        path: "chat/managers",
        element: <ManagerChat />,
      },
    ],
  },

  // 6. Marketer Department Chat (Accessible by Marketers & Admin)
  {
    element: <DepartmentRoute allowedDepartments={["marketer"]} />,
    children: [
      {
        path: "chat/marketers",
        element: <MarketerChat />,
      },
    ],
  },
];
