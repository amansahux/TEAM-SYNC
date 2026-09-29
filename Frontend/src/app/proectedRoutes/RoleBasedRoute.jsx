import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const RoleBasedRoute = ({ AllowedRoles = [] }) => {
  const { employee, isHydrating } = useSelector((state) => state.auth);

  if (isHydrating) {
    return null;
  }

  const employeeRole = (
    employee?.user?.role ||
    employee?.role ||
    employee?.employee?.user?.role ||
    employee?.data?.user?.role ||
    ""
  ).toLowerCase();
  
  const allowedRoles = AllowedRoles.map((role) => role.toLowerCase());

  if (!employee || !allowedRoles.includes(employeeRole)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default RoleBasedRoute;
