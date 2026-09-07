import Attendance from "../../features/employee module/Attendence/ui/page/Attendance";
import MyTask from "../../features/employee module/MyTask/ui/page/MyTask";
import Profile from "../../features/employee module/profile/ui/page/Profile";

export const employeeRoutes = [
    {
        path:"attendance",
        element:<Attendance/>
    },
    {
        path:"my-task",
        element:<MyTask/>
    },
    {
        path:"profile",
        element:<Profile/>
    }
]