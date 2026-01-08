import { createContext, useContext, useState, useEffect } from "react";
// import { loginUser } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  console.log(API); // http://localhost:5000


  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    if (serverToken) localStorage.setItem("token", serverToken);
  };

  const removeTokenFromLS = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  // const login = async (credentials) => {
  //   setIsLoading(true);
  //   try {
  //     const data = await loginUser(credentials);
  //     const serverToken = data.token;
  //     if (!serverToken) throw new Error("Authentication failed: no token returned");
  //     storeTokenInLS(serverToken);
  //     const userData = await getUser(serverToken);
  //     setUser(userData.user || userData.userData || null);
  //     return { ok: true };
  //   } catch (error) {
  //     return { ok: false, error };
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
    API
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