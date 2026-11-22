import { z } from 'zod';
import { PurityGrade, WasteStreamType } from '@prisma/client';

export const createListingSchema = z.object({
  category: z.nativeEnum(WasteStreamType).default(WasteStreamType.DRY),
  subType: z.string().min(2, 'Sub-type description is required'),
  quantityKg: z.number().positive('Quantity must be greater than 0'),
  purityGrade: z.nativeEnum(PurityGrade).default(PurityGrade.A),
  minimumBidPerKg: z.number().positive('Minimum bid must be greater than 0'),
  pickupAddress: z.string().min(5, 'Pickup address is required'),
  localityName: z.string().min(2, 'Locality name is required'),
  notes: z.string().optional(),
  images: z.array(z.string()).optional(),
});

export const purchaseRequestSchema = z.object({
  offeredPricePerKg: z.number().positive('Offered price must be greater than 0'),
  requestedQuantityKg: z.number().positive('Requested quantity must be positive'),
  notes: z.string().optional(),
});

