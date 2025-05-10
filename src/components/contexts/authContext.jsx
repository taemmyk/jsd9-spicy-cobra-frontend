import React, { createContext, useState, useEffect, useContext, Children } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({Children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try{
                const response = await api.get("/auth/profile");
                setUser(response.data.user);
            } catch(err) {
                console.error("Not authenticated", err);
                setUser(null);
            } finally{
                setLoading(false);
            }
        }

        fetchProfile();
    }, []);

    const login = (userData) => {
        setUser(userData);
        navigate("/login");
    }

    const logout = async () => {
        try{
            await api.post("auth/logout");
            setUser(null)
            navigate("/login");
        } catch(err) {
            console.log("Logout failed:", err);
        }
    }

    return (
        <AuthContext.Provider value={{user, setUser, login, logout, loading}}>
            {Children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)