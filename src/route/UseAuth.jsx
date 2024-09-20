import React from "react";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const login = () => {
    setAuthenticated(true);
  };
  const logout = () => {
    setAuthenticated(false);
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated: isAuthenticated, login: login, logout: logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function AuthConsumer() {
  return useContext(AuthContext);
}
