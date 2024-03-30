import React from "react";
import { Navigate, useOutletContext, Outlet } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const ProtectedRoute = ({ role }) => {
  const context = useAuth();
  console.log(context);
  if (!context?.user || !context?.user?.role.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet context={context} />;
};

export default ProtectedRoute;
