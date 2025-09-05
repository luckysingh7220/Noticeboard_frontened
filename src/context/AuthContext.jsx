import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: null });

  // Fetch user profile from backend
  const fetchUserProfile = async (token) => {
    try {
      const res = await fetch("https://noticeboardbackened-production.up.railway.app/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!res.ok) throw new Error("Failed to fetch user profile");

      const userData = await res.json();
      setAuth({ user: userData, token });
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setAuth({ user: null, token: null });
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    fetchUserProfile(token); // 👈 Fetch full profile here too
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ user: null, token: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
