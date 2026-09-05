import Department from "../../features/admin module/departments/ui/page/Department";
import Document from "../../features/admin module/documents/ui/page/Document";
import Employee from "../../features/admin module/employees/ui/page/Employee";
import Task from "../../features/admin module/tasks/ui/page/Task";

export const adminRoutes = [
    {
        path:"/home/department",
        element:<Department/>
    },
    {
        path:"/home/employee",
        element:<Employee/>
    },
    {
        path:"/home/document",
        element:<Document/>
    },{
        path:"/home/task",
        element:<Task/>
    }
]