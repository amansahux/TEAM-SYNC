
import MyTask from "../../features/employee module/MyTask/ui/page/MyTask";
import TaskDetail from "../../features/employee module/MyTask/ui/page/TaskDetail";

export const employeeRoutes = [
    {
        path:"my-task",
        element:<MyTask/>
    },
    {
        path:"my-task/:id",
        element:<TaskDetail/>
    },
]