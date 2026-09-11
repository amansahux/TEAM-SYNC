import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const DepartmentRoute = ({ allowedDepartments = [], allowAdmin = true }) => {
  const { employee } = useSelector((state) => state.auth);
  const user =
    employee?.user ||
    employee?.data?.user ||
    employee?.employee?.user ||
    employee ||
    {};

  const role = (user?.role || "").toLowerCase();
  const department = (user?.department || "").toLowerCase();

  // Admin has full access across all department channels
  if (allowAdmin && role === "admin") {
    return <Outlet />;
  }

  const normalizedAllowed = allowedDepartments.map((d) => d.toLowerCase());
  const hasAccess = normalizedAllowed.includes(department);

  if (!hasAccess) {
    return <Navigate to="/dashboard/chat" replace />;
  }

  return <Outlet />;
};

export default DepartmentRoute;
