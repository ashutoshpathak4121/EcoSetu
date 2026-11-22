import { api } from './api';

export const municipalApi = {
  getOverview: async () => {
    const res = await api.get('/municipal/overview');
    return res.data.data;
  },

  getLocalityAnalytics: async () => {
    const res = await api.get('/municipal/analytics');
    return res.data.data;
  },

  getVehicles: async () => {
    const res = await api.get('/municipal/vehicles');
    return res.data.data;
  },

  getFlaggedReviews: async () => {
    const res = await api.get('/municipal/flagged-reviews');
    return res.data.data;
  },
};

