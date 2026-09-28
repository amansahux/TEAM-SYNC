import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const DashboardIndex = () => {
  const { employee } = useSelector((state) => state.auth);
  const employeeRole = (
    employee?.user?.role ||
    employee?.role ||
    employee?.employee?.user?.role ||
    employee?.data?.user?.role ||
    ""
  ).toLowerCase();

  if (employeeRole === "admin") {
    return <Navigate to="/dashboard/admin" replace />;
  }

  if (employeeRole === "employee") {
    return <Navigate to="/dashboard/employee" replace />;
  }

  return <Navigate to="/" replace />;
};

export default DashboardIndex;
