import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const RoleBasedRoute = ({ AllowedRoles }) => {
  const { employee } = useSelector((state) => state.auth);
  const employeeRole = (
    employee?.user?.role ||
    employee?.role ||
    employee?.employee?.user?.role ||
    employee?.data?.user?.role ||
    ""
  );
  const allowedRoles = AllowedRoles.map((role) => role.toLowerCase());

  if (!allowedRoles.includes(employeeRole)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default RoleBasedRoute;
