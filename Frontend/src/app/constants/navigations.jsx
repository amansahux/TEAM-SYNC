import {
  Book,
  CheckSquare,
  Grid2X2,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";

export const roleNavigationItems = {
  employee: [
    { label: "Dashboard", icon: Grid2X2, to: "/dashboard" },
    { label: "Chat", icon: MessageSquare, to: "/dashboard/chat", alsoActiveFor: ["/dashboard/chat"] },
    { label: "My Tasks", icon: CheckSquare, to: "/dashboard/my-task" },
    { label: "Settings", icon: Settings, to: "/dashboard/setting" },
  ],
  admin: [
    { label: "Dashboard", icon: Grid2X2, to: "/dashboard" },
    { label: "Chat", icon: MessageSquare, to: "/dashboard/chat", alsoActiveFor: ["/dashboard/chat"] },
    { label: "Departments", icon: Users, to: "/dashboard/department" },
    { label: "Employees", icon: Users, to: "/dashboard/employee", alsoActiveFor: ["/dashboard/add-employee"] },
    { label: "Tasks", icon: CheckSquare, to: "/dashboard/task" },
    { label: "Settings", icon: Settings, to: "/dashboard/setting" },
  ],
};
