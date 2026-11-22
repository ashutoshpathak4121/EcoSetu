import { api } from './api';

export const adminApi = {
  getUsers: async () => {
    const res = await api.get('/admin/users');
    return res.data.data;
  },

  updateUserRole: async (userId: string, role: string) => {
    const res = await api.patch(`/admin/users/${userId}/role`, { role });
    return res.data.data;
  },

  getLogs: async () => {
    const res = await api.get('/admin/logs');
    return res.data.data;
  },

  verifyRecycler: async (recyclerId: string, status: 'VERIFIED' | 'REJECTED') => {
    const res = await api.patch(`/admin/recyclers/${recyclerId}/verify`, { status });
    return res.data.data;
  },
};

