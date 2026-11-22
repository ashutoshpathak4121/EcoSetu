import { api } from './api';

export const aiApi = {
  verifyWaste: async (imageBase64: string, declaredCategory?: string) => {
    const res = await api.post('/ai/verify', { imageBase64, declaredCategory });
    return res.data;
  },
};

