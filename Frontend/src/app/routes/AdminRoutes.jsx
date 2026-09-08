import Department from "../../features/admin module/departments/ui/page/Department";
import Document from "../../features/admin module/documents/ui/page/Document";
import AddEmployee from "../../features/admin module/employees/ui/page/AddEmployee";
import Employee from "../../features/admin module/employees/ui/page/Employee";
import Task from "../../features/admin module/tasks/ui/page/Task";

export const adminRoutes = [
    {
        path:"department",
        element:<Department/>
    },
    {
        path:"add-employee",
        element:<AddEmployee/>
    },
    {
        path:"employee",
        element:<Employee/>
    },
    {   
        path:"document",
        element:<Document/>
    },{
        path:"task",
        element:<Task/>
    }
]