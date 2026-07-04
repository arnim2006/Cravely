import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/me', {
        withCredentials: true,
      });
      setUser(response.data.user);
      setRole(response.data.role);
    } catch (error) {
      setUser(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password, isPartner) => {
    setLoading(true);
    try {
      const url = isPartner
        ? 'http://localhost:3000/api/auth/food-partner/login'
        : 'http://localhost:3000/api/auth/user/login';
      const response = await axios.post(url, { email, password }, { withCredentials: true });
      await checkAuth();
      return response.data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await axios.get('http://localhost:3000/api/auth/user/logout', {
        withCredentials: true,
      });
    } catch (error) {
      console.error('Logout error', error);
    } finally {
      setUser(null);
      setRole(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
