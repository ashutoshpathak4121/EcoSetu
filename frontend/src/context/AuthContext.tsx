import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '../../../shared/types';
import { authApi, UpdateProfilePayload, ChangePasswordPayload, ResetPasswordPayload } from '../services/auth.api';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phoneNumber?: string;
  avatarUrl?: string;
  isVerified?: boolean;
  status?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (payload: any) => Promise<void>;
  updateProfile: (payload: UpdateProfilePayload) => Promise<User>;
  changePassword: (payload: ChangePasswordPayload) => Promise<any>;
  forgotPassword: (email: string) => Promise<any>;
  resetPassword: (payload: ResetPasswordPayload) => Promise<any>;
  logout: () => void;
  switchDemoRole: (role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_CREDENTIALS: Record<UserRole, { email: string; pass: string }> = {
  [UserRole.RESIDENT]: { email: 'resident@ecosetu.in', pass: 'Password@123' },
  [UserRole.COLLECTOR]: { email: 'collector@ecosetu.in', pass: 'Password@123' },
  [UserRole.SOCIETY_ADMIN]: { email: 'society@ecosetu.in', pass: 'Password@123' },
  [UserRole.RECYCLER]: { email: 'recycler@ecosetu.in', pass: 'Password@123' },
  [UserRole.MCD_OFFICER]: { email: 'mcd@ecosetu.in', pass: 'Password@123' },
  [UserRole.SUPER_ADMIN]: { email: 'admin@ecosetu.in', pass: 'Password@123' },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ecosetu_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('ecosetu_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('ecosetu_token');
      if (storedToken) {
        try {
          const profile = await authApi.getMe();
          if (profile) {
            setUser(profile);
            localStorage.setItem('ecosetu_user', JSON.stringify(profile));
          }
        } catch (e) {
          console.warn('Session check fallback to cached session');
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
      const payloadData = res?.data || res;
      const authUser = payloadData?.user;
      const authToken = payloadData?.token || 'mock_jwt_ecosetu_demo_token';

      if (authUser) {
        setUser(authUser);
        setToken(authToken);
        localStorage.setItem('ecosetu_token', authToken);
        localStorage.setItem('ecosetu_user', JSON.stringify(authUser));
      } else {
        throw new Error('No user data returned from login');
      }
    } catch (err: any) {
      // Check if mock user or seed user in demo fallback mode
      console.warn('Backend login fallback for', email, err.message);
      const role = email.includes('collector')
        ? UserRole.COLLECTOR
        : email.includes('society')
        ? UserRole.SOCIETY_ADMIN
        : email.includes('recycler')
        ? UserRole.RECYCLER
        : email.includes('mcd')
        ? UserRole.MCD_OFFICER
        : email.includes('admin')
        ? UserRole.SUPER_ADMIN
        : UserRole.RESIDENT;

      const roleNames: Record<UserRole, string> = {
        [UserRole.RESIDENT]: 'Aarav Sharma',
        [UserRole.COLLECTOR]: 'Rajesh Kumar',
        [UserRole.SOCIETY_ADMIN]: 'Sunita Mehra',
        [UserRole.RECYCLER]: 'Vikram Singhania',
        [UserRole.MCD_OFFICER]: 'Dr. Ramesh Chandra',
        [UserRole.SUPER_ADMIN]: 'DevOps Admin',
      };

      const fallbackUser: User = {
        id: `usr-${role.toLowerCase()}`,
        name: roleNames[role] || 'EcoSetu User',
        email,
        role,
        phoneNumber: '+91 98765 43210',
        isVerified: true,
        status: 'ACTIVE',
      };
      const fallbackToken = 'mock_jwt_ecosetu_demo_token';

      setUser(fallbackUser);
      setToken(fallbackToken);
      localStorage.setItem('ecosetu_token', fallbackToken);
      localStorage.setItem('ecosetu_user', JSON.stringify(fallbackUser));
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
      localStorage.setItem('ecosetu_token', authToken);
      localStorage.setItem('ecosetu_user', JSON.stringify(authUser));
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (payload: UpdateProfilePayload): Promise<User> => {
    const updated = await authApi.updateProfile(payload);
    const mergedUser = { ...user, ...updated };
    setUser(mergedUser);
    localStorage.setItem('ecosetu_user', JSON.stringify(mergedUser));
    return mergedUser;
  };

  const changePassword = async (payload: ChangePasswordPayload) => {
    return await authApi.changePassword(payload);
  };

  const forgotPassword = async (email: string) => {
    return await authApi.forgotPassword(email);
  };

  const resetPassword = async (payload: ResetPasswordPayload) => {
    return await authApi.resetPassword(payload);
  };

  const logout = () => {
    authApi.logout().catch(() => {});
    setUser(null);
    setToken(null);
    localStorage.removeItem('ecosetu_token');
    localStorage.removeItem('ecosetu_user');
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
        updateProfile,
        changePassword,
        forgotPassword,
        resetPassword,
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
