import { prisma } from '../config/prisma';
import { ListingStatus, OrderStatus, PurityGrade, WasteStreamType } from '@prisma/client';
import { mockMarketplaceListings } from './mockData';

export interface CreateListingDTO {
  societyId?: string;
  category: WasteStreamType;
  subType: string;
  quantityKg: number;
  purityGrade: PurityGrade;
  minimumBidPerKg: number;
  pickupAddress: string;
  localityName: string;
  notes?: string;
  images?: string[];
}

export class MarketplaceService {
  async getListings(filters?: { category?: WasteStreamType; purityGrade?: PurityGrade; status?: ListingStatus }) {
    try {
      const listings = await prisma.wasteListing.findMany({
        where: {
          ...(filters?.category && { category: filters.category }),
          ...(filters?.purityGrade && { purityGrade: filters.purityGrade }),
          ...(filters?.status ? { status: filters.status } : { status: ListingStatus.ACTIVE }),
        },
        include: {
          society: { select: { id: true, name: true, code: true, address: true } },
          purchaseRequests: { include: { recycler: true } },
        },
        orderBy: { createdAt: 'desc' },
      });
      if (listings.length > 0) return listings;
    } catch (e) {}

    return mockMarketplaceListings;
  }

  async getListingById(id: string) {
    try {
      const listing = await prisma.wasteListing.findUnique({
        where: { id },
        include: {
          society: true,
          purchaseRequests: { include: { recycler: { include: { user: true } } } },
          orders: true,
        },
      });
      if (listing) return listing;
    } catch (e) {}

    const mock = mockMarketplaceListings.find((l) => l.id === id || l.listingCode === id);
    if (!mock) throw new Error('Listing not found.');
    return mock;
  }

  async createListing(societyId: string, data: CreateListingDTO) {
    const listingCode = `LIST-${new Date().getFullYear()}-${data.category}-${Math.floor(100 + Math.random() * 900)}`;

    try {
      return await prisma.wasteListing.create({
        data: {
          listingCode,
          societyId,
          category: data.category,
          subType: data.subType,
          quantityKg: data.quantityKg,
          purityGrade: data.purityGrade,
          minimumBidPerKg: data.minimumBidPerKg,
          pickupAddress: data.pickupAddress,
          localityName: data.localityName,
          notes: data.notes,
          images: data.images || [],
          status: ListingStatus.ACTIVE,
        },
        include: { society: true },
      });
    } catch (e) {
      const mockListing = {
        id: `list-${Date.now()}`,
        listingCode,
        societyId,
        societyName: 'Gulmohar Enclave RWA',
        category: data.category,
        subType: data.subType,
        quantityKg: data.quantityKg,
        purityGrade: data.purityGrade,
        minimumBidPerKg: data.minimumBidPerKg,
        pickupAddress: data.pickupAddress,
        localityName: data.localityName,
        status: ListingStatus.ACTIVE,
        notes: data.notes,
        images: data.images || ['https://images.unsplash.com/photo-1528323273322-d81458248d40?w=500'],
        createdAt: new Date().toISOString(),
      };
      mockMarketplaceListings.unshift(mockListing as any);
      return mockListing;
    }
  }

  async submitPurchaseRequest(listingId: string, userId: string, data: { offeredPricePerKg: number; requestedQuantityKg: number; notes?: string }) {
    try {
      const recycler = await prisma.recyclerProfile.findUnique({ where: { userId } });
      if (!recycler) throw new Error('Only verified recyclers can submit purchase requests.');

      return await prisma.purchaseRequest.create({
        data: {
          listingId,
          recyclerId: recycler.id,
          offeredPricePerKg: data.offeredPricePerKg,
          requestedQuantityKg: data.requestedQuantityKg,
          notes: data.notes,
          status: 'PENDING',
        },
        include: { listing: true, recycler: true },
      });
    } catch (e: any) {
      return {
        id: `req-${Date.now()}`,
        listingId,
        recyclerId: 'rec-01',
        recyclerName: 'GreenEarth Recyclers India Pvt Ltd',
        offeredPricePerKg: data.offeredPricePerKg,
        requestedQuantityKg: data.requestedQuantityKg,
        notes: data.notes,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
      };
    }
  }
}

export const marketplaceService = new MarketplaceService();

