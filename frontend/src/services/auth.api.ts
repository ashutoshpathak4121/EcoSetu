import { api } from './api';
import { UserRole } from '../../../shared/types';

export interface RegisterPayload {
  email: string;
  password: string;
  confirmPassword?: string;
  name: string;
  phoneNumber?: string;
  role: UserRole;
  termsAccepted?: boolean;
  societyId?: string;
  flatNumber?: string;
  wingBlock?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UpdateProfilePayload {
  name?: string;
  phoneNumber?: string;
  avatarUrl?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword?: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
  confirmPassword?: string;
}

export const authApi = {
  login: async (payload: LoginPayload) => {
    const res = await api.post('/auth/login', payload);
    return res.data;
  },

  register: async (payload: RegisterPayload) => {
    const res = await api.post('/auth/register', payload);
    return res.data;
  },

  getMe: async () => {
    const res = await api.get('/auth/me');
    return res.data.data;
  },

  getProfile: async () => {
    const res = await api.get('/auth/profile');
    return res.data.data;
  },

  updateProfile: async (payload: UpdateProfilePayload) => {
    const res = await api.patch('/auth/profile', payload);
    return res.data.data;
  },

  changePassword: async (payload: ChangePasswordPayload) => {
    const res = await api.post('/auth/change-password', payload);
    return res.data;
  },

  forgotPassword: async (email: string) => {
    const res = await api.post('/auth/forgot-password', { email });
    return res.data;
  },

  resetPassword: async (payload: ResetPasswordPayload) => {
    const res = await api.post('/auth/reset-password', payload);
    return res.data;
  },

  logout: async () => {
    const res = await api.post('/auth/logout');
    return res.data;
  },
};
