import { api } from './api';

export interface SubmitEvidencePayload {
  latitude?: number;
  longitude?: number;
  wetWeightKg: number;
  dryWeightKg: number;
  sanitaryWeightKg: number;
  specialCareWeightKg: number;
  imageBase64?: string;
  notes?: string;
}

export const collectorApi = {
  getTasks: async () => {
    const res = await api.get('/collector/tasks');
    return res.data.data;
  },

  submitEvidence: async (collectionId: string, payload: SubmitEvidencePayload) => {
    const res = await api.post(`/collector/collections/${collectionId}/evidence`, payload);
    return res.data.data;
  },

  updateStatus: async (collectionId: string, status: string) => {
    const res = await api.patch(`/collector/collections/${collectionId}/status`, { status });
    return res.data.data;
  },
};

