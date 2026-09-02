import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../../features/auth/pages/Login";
import Register from "../../features/auth/pages/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import Home from "../../features/dashboard/pages/Home";
import { useDispatch } from "react-redux";
import { getCurrentEmployee } from "../../features/auth/state/auth/AuthAction";
import ProtectedRoutes from "../proectedRoutes/ProtectedRoutes";
import PublicRoutes from "../proectedRoutes/PublicRoutes";

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
            {
              path: "register",
              element: <Register />,
            },
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
          children: [{ path: "", element: <Home /> }],
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default AppRoutes;
