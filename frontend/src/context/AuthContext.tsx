import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '../../../shared/types';
import { authApi } from '../services/auth.api';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phoneNumber?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (payload: any) => Promise<void>;
  logout: () => void;
  switchDemoRole: (role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_CREDENTIALS: Record<UserRole, { email: string; pass: string }> = {
  [UserRole.RESIDENT]: { email: 'resident@swachhsetu.in', pass: 'Password@123' },
  [UserRole.COLLECTOR]: { email: 'collector@swachhsetu.in', pass: 'Password@123' },
  [UserRole.SOCIETY_ADMIN]: { email: 'society@swachhsetu.in', pass: 'Password@123' },
  [UserRole.RECYCLER]: { email: 'recycler@swachhsetu.in', pass: 'Password@123' },
  [UserRole.MCD_OFFICER]: { email: 'mcd@swachhsetu.in', pass: 'Password@123' },
  [UserRole.SUPER_ADMIN]: { email: 'admin@swachhsetu.in', pass: 'Password@123' },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('swachhsetu_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('swachhsetu_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('swachhsetu_token');
      if (storedToken) {
        try {
          const profile = await authApi.getMe();
          setUser(profile);
          localStorage.setItem('swachhsetu_user', JSON.stringify(profile));
        } catch (e) {
          console.warn('Session expired or invalid, clearing local auth.');
          localStorage.removeItem('swachhsetu_token');
          localStorage.removeItem('swachhsetu_user');
          setUser(null);
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const res = await authApi.login({ email, password: pass });
      const { user: authUser, token: authToken } = res.data;
      setUser(authUser);
      setToken(authToken);
      localStorage.setItem('swachhsetu_token', authToken);
      localStorage.setItem('swachhsetu_user', JSON.stringify(authUser));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: any) => {
    setIsLoading(true);
    try {
      const res = await authApi.register(payload);
      const { user: authUser, token: authToken } = res.data;
      setUser(authUser);
      setToken(authToken);
      localStorage.setItem('swachhsetu_token', authToken);
      localStorage.setItem('swachhsetu_user', JSON.stringify(authUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('swachhsetu_token');
    localStorage.removeItem('swachhsetu_user');
  };

  const switchDemoRole = async (role: UserRole) => {
    const creds = DEMO_CREDENTIALS[role];
    if (creds) {
      await login(creds.email, creds.pass);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        register,
        logout,
        switchDemoRole,
      }}
    >
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

