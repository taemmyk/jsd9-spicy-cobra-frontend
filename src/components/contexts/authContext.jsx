import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await api.get("/profile");
          setUser(response.data.user);
        } catch (err) {
          // console.error("Not authenticated", err);
          setUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const login = async () => {
    try {
      const response = await api.get("/profile");
      setUser(response.data.user);
    } catch (err) {
      // console.error("Not authenticated", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      localStorage.removeItem("token");
      // console.log("Logout successful");
    } catch (err) {
      // console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);