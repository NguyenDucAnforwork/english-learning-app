"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, getCurrentUser } from './api';

interface AuthContextType {
  user: User | null;
  token: string;
  loading: boolean;
  setToken: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: '',
  loading: true,
  setToken: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setTokenState(storedToken);
    }
    else{
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      if (token) {
        try {
          const userData = await getCurrentUser(token);
          setUser(userData);
        } catch (error) {
          console.error('❌ Failed to fetch user:', error);
          logout();
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    fetchUser();
  }, [token]);

  const setToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setTokenState(newToken);
  };

  const logout = () => {
    setTokenState('');
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
