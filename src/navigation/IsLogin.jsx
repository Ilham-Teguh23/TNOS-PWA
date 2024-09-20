import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function IsLogin({ children }) {
  const user = useSelector((store) => store?.auth);
  const { token } = user;

  if (token) {
    return <Navigate to="/dashboard" />;
  }
  return children;
}

export default IsLogin;
