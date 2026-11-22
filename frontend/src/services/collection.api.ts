import { api } from './api';
import { CollectionStatus, WasteStream } from '../../../shared/types';

export interface CreateCollectionRequest {
  householdId?: string;
  scheduledDate?: string;
  notes?: string;
  wasteStreams?: {
    stream: WasteStream;
    estimatedKg: number;
  }[];
}

export const collectionApi = {
  createCollection: async (payload: CreateCollectionRequest) => {
    const res = await api.post('/collections', payload);
    return res.data.data;
  },

  getCollections: async (filter?: { status?: CollectionStatus; localityId?: string }) => {
    const res = await api.get('/collections', { params: filter });
    return res.data.data;
  },

  getById: async (id: string) => {
    const res = await api.get(`/collections/${id}`);
    return res.data.data;
  },

  updateStatus: async (id: string, status: CollectionStatus, rejectionReason?: string) => {
    const res = await api.patch(`/collections/${id}/status`, { status, rejectionReason });
    return res.data.data;
  },

  getHouseholdHistory: async (householdId: string) => {
    const res = await api.get(`/collections/household/${householdId}`);
    return res.data.data;
  },
};
