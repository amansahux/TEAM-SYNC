import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../../features/auth/pages/Login";
import DashboardLayout from "../Layout/DashboardLayout";
import Home from "../../features/dashboard/ui/pages/Home";
import { useDispatch } from "react-redux";
import { getCurrentEmployee } from "../../features/auth/state/auth/AuthAction";
import ProtectedRoutes from "../proectedRoutes/ProtectedRoutes";
import PublicRoutes from "../proectedRoutes/PublicRoutes";
import { commonRoutes } from "./CommonRoutes";
import RoleBasedRoute from "../proectedRoutes/RoleBasedRoute";
import { adminRoutes } from "./AdminRoutes";
import { employeeRoutes } from "./EmployeeRoutes.jsx";

const AppRoutes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (() => {
      dispatch(getCurrentEmployee());
    })();
  }, []);

  const routes = createBrowserRouter([
    {
      path: "",
      element: <PublicRoutes />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            { path: "", element: <Login /> },
          ],
        },
      ],
    },
    {
      path: "/dashboard",
      element: <ProtectedRoutes />,
      children: [
        {
          path: "",
          element: <DashboardLayout />,
          children: [
            ...commonRoutes,
            {
              element: <RoleBasedRoute AllowedRoles={["admin"]} />,
              children: adminRoutes,
            },
            {
              element: <RoleBasedRoute AllowedRoles={["employee"]} />,
              children: employeeRoutes,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default AppRoutes;
