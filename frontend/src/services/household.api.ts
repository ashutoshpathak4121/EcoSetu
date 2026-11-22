import { api } from './api';

export const householdApi = {
  getMyHousehold: async () => {
    const res = await api.get('/households/me');
    return res.data.data;
  },

  getById: async (id: string) => {
    const res = await api.get(`/households/${id}`);
    return res.data.data;
  },

  getSocietyHouseholds: async (societyId: string) => {
    const res = await api.get(`/households/society/${societyId}`);
    return res.data.data;
  },
};

