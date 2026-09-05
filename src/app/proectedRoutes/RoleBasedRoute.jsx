import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const RoleBasedRoute = ({ AllowedRoles }) => {
  const { employee } = useSelector((state) => state.auth);
  console.log(employee)
  if (!AllowedRoles.includes(employee?.user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

export default RoleBasedRoute;
