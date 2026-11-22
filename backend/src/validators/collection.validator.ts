import { z } from 'zod';
import { CollectionStatus, WasteStreamType } from '@prisma/client';

export const createCollectionSchema = z.object({
  householdId: z.string().optional(),
  societyId: z.string().optional(),
  scheduledDate: z.string().optional(),
  notes: z.string().optional(),
  wasteStreams: z
    .array(
      z.object({
        stream: z.nativeEnum(WasteStreamType),
        estimatedKg: z.number().nonnegative().default(1.0),
      })
    )
    .optional(),
});

export const updateCollectionStatusSchema = z.object({
  status: z.nativeEnum(CollectionStatus),
  rejectionReason: z.string().optional(),
  notes: z.string().optional(),
});

export const collectorEvidenceSchema = z.object({
  latitude: z.coerce
    .number()
    .min(28.20, 'Latitude outside valid Indian municipal jurisdiction')
    .max(29.10, 'Latitude outside valid Indian municipal jurisdiction')
    .optional(),
  longitude: z.coerce
    .number()
    .min(76.70, 'Longitude outside valid Indian municipal jurisdiction')
    .max(77.60, 'Longitude outside valid Indian municipal jurisdiction')
    .optional(),
  accuracyMeters: z.coerce.number().optional(),
  wetWeightKg: z.coerce.number().nonnegative().default(0.0),
  dryWeightKg: z.coerce.number().nonnegative().default(0.0),
  sanitaryWeightKg: z.coerce.number().nonnegative().default(0.0),
  specialCareWeightKg: z.coerce.number().nonnegative().default(0.0),
  notes: z.string().optional(),
  imageBase64: z.string().optional(),
});

