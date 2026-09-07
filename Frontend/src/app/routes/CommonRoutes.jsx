import Chat from "../../features/chats/ui/page/Chat";
import Home from "../../features/dashboard/ui/pages/Home";
import Setting from "../../features/settings/ui/page/Setting";

export const commonRoutes = [
    {
        path:"",
        element:<Home/>
    },
    {
        path:"chat",
        element:<Chat/>
    },
    {
        path:"setting",
        element:<Setting/>
    }
]