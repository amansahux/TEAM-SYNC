
import GenralChat from "../../features/chats/ui/page/GenralChat";
import Home from "../../features/dashboard/ui/pages/Home";
import Setting from "../../features/settings/ui/page/Setting";

export const commonRoutes = [
    {
        path:"",
        element:<Home/>
    },
    {
        path:"chat",
        element:<GenralChat/>
    },
    {
        path:"setting",
        element:<Setting/>
    }
]