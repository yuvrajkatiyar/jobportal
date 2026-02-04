// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(null); // user object (includes role)
  const [token, setTokenState] = useState(null);

  useEffect(() => {
    const rawUser = localStorage.getItem("user");
    const rawToken = localStorage.getItem("token");
    if (rawUser) setUserState(JSON.parse(rawUser));
    if (rawToken) setTokenState(rawToken);
  }, []);

  // setUser accepts (userObj, tokenStr)
  const setUser = (userObj, tokenStr) => {
    if (tokenStr) {
      localStorage.setItem("token", tokenStr);
      setTokenState(tokenStr);
    }
    if (userObj) {
      localStorage.setItem("user", JSON.stringify(userObj));
      setUserState(userObj);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserState(null);
    setTokenState(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, setUser, logout, isCompany: !!(user && user.role === "company") }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
