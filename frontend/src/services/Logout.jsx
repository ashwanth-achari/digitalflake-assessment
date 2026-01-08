import React, { useEffect } from "react";
import { useAuth } from "../store/AuthContext";
import { Navigate } from "react-router-dom";

function Logout() {
  const { removeTokenFromLS } = useAuth();

  useEffect(() => {
    removeTokenFromLS();
  }, []);

  return <Navigate to="/login" />;
}  

export default Logout;
