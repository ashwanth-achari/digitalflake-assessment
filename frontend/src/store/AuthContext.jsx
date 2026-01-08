import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoading, setIsLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL;
  // console.log(API);

  const authorizationToken = token ? `Bearer ${token}` : "";

  //store token in LS
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    if (serverToken) localStorage.setItem("token", serverToken);
  };

  //remove token from LS
  const removeTokenFromLS = () => {
    localStorage.removeItem("token");
    setToken("");
  };
  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const logout = () => {
    removeTokenFromLS();
  };

  const value = {
    token,
    isLoading,
    logout,
    storeTokenInLS,
    removeTokenFromLS,
    isLoggedIn: !!token,
    API,
    authorizationToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};