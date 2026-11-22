import { api } from './api';
import { UserRole } from '../../../shared/types';

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  phoneNumber?: string;
  role: UserRole;
  societyId?: string;
  flatNumber?: string;
  wingBlock?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
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

  logout: async () => {
    const res = await api.post('/auth/logout');
    return res.data;
  },
};

