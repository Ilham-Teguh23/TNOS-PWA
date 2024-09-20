import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

//check if user is login

function ProtectedRoute({ children }) {
  const user = useSelector((store) => store?.auth);
  const { token } = user;

  if (!token) {
    return <Navigate to="/auth/login" />;
  }
  return children;
}

export default ProtectedRoute;
