import { api } from './api';
import { WasteStream } from '../../../shared/types';

export interface CreateListingPayload {
  category: WasteStream;
  subType: string;
  quantityKg: number;
  purityGrade: 'A_PLUS' | 'A' | 'B' | 'STANDARD';
  minimumBidPerKg: number;
  pickupAddress: string;
  localityName: string;
  notes?: string;
  images?: string[];
}

export const marketplaceApi = {
  getListings: async (filters?: { category?: string; purityGrade?: string; status?: string }) => {
    const res = await api.get('/marketplace/listings', { params: filters });
    return res.data.data;
  },

  getListingById: async (id: string) => {
    const res = await api.get(`/marketplace/listings/${id}`);
    return res.data.data;
  },

  createListing: async (payload: CreateListingPayload) => {
    const res = await api.post('/marketplace/listings', payload);
    return res.data.data;
  },

  submitPurchaseRequest: async (listingId: string, payload: { offeredPricePerKg: number; requestedQuantityKg: number; notes?: string }) => {
    const res = await api.post(`/marketplace/listings/${listingId}/purchase`, payload);
    return res.data.data;
  },
};

