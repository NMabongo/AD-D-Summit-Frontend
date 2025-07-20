import { deleteToken, getToken, saveToken } from '@/utils/authToken';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => { console.log('Default login (fallback) called'); },
  logout: async () => {},
  checkAuth: async () => {},
});


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    const token = await getToken();
    setIsAuthenticated(!!token);
  };

const login = async (token: string) => {
  try {
    await saveToken(token);
    setIsAuthenticated(true);
  } catch (err) {
    console.error("Error in saveToken:", err); 
  }
};

  const logout = async () => {
    const token = await getToken();
    if (token) {
      try {
        await fetch('https://localhost:7072/api/User/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Backend logout failed:', error);
      }
    }

    await deleteToken();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
