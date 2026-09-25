import Department from "../../features/admin module/departments/ui/page/Department";
import DepartmentDetail from "../../features/admin module/departments/ui/page/DepartmentDetail";
import AddEmployee from "../../features/admin module/employees/ui/page/AddEmployee";
import Employee from "../../features/admin module/employees/ui/page/Employee";
import CreateTask from "../../features/admin module/tasks/ui/page/CreateTask";
import Task from "../../features/admin module/tasks/ui/page/Task";

export const adminRoutes = [
  {
    path: "department",
    element: <Department />,
  },
  {
    path: "department/:department",
    element: <DepartmentDetail />,
  },
  {
    path: "add-employee",
    element: <AddEmployee />,
  },
  {
    path: "employee",
    element: <Employee />,
  },
  {
    path: "task",
    element: <Task />,
  },
  {
    path: "create-task",
    element: <CreateTask />,
  },
];
