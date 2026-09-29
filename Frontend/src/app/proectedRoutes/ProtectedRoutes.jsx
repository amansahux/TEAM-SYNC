import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
  const { employee, isHydrating } = useSelector((state) => state.auth);
  if (isHydrating) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[var(--primary)] border-t-transparent" />
      </div>
    );
  }

  if (!employee) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
