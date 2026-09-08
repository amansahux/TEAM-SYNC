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
    { label: "Chat", icon: MessageSquare, to: "/dashboard/chat" },
    { label: "Attendance", icon: Book, to: "/dashboard/attendance" },
    { label: "My Tasks", icon: CheckSquare, to: "/dashboard/my-task" },
    { label: "Profile", icon: Users, to: "/dashboard/profile" },
    { label: "Settings", icon: Settings, to: "/dashboard/setting" },
  ],
  admin: [
    { label: "Dashboard", icon: Grid2X2, to: "/dashboard" },
    { label: "Chat", icon: MessageSquare, to: "/dashboard/chat" },
    { label: "Departments", icon: Users, to: "/dashboard/department" },
    { label: "Employees", icon: Users, to: "/dashboard/employee" },
    { label: "Documents", icon: CheckSquare, to: "/dashboard/document" },
    { label: "Tasks", icon: CheckSquare, to: "/dashboard/task" },
    { label: "Settings", icon: Settings, to: "/dashboard/setting" },
  ],
};
