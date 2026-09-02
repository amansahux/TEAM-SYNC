import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
  const { employee, Loading } = useSelector((state) => state.auth);
//   console.log("ProtectedRoutes", employee, Loading);
  if (Loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  if (!employee) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
