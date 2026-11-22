// Shared TypeScript types for SwachhSetu Ecosystem

export enum UserRole {
  RESIDENT = 'RESIDENT',
  COLLECTOR = 'COLLECTOR',
  SOCIETY_ADMIN = 'SOCIETY_ADMIN',
  RECYCLER = 'RECYCLER',
  MCD_OFFICER = 'MCD_OFFICER',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum WasteStream {
  WET = 'WET',
  DRY = 'DRY',
  SANITARY = 'SANITARY',
  SPECIAL_CARE = 'SPECIAL_CARE',
}

export enum CollectionStatus {
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  COLLECTOR_ON_THE_WAY = 'COLLECTOR_ON_THE_WAY',
  COLLECTED = 'COLLECTED',
  VERIFICATION_PENDING = 'VERIFICATION_PENDING',
  VERIFIED = 'VERIFIED',
  PROCESSED = 'PROCESSED',
  REJECTED = 'REJECTED',
  DISPUTED = 'DISPUTED',
}

export enum VerificationStatus {
  APPROVED = 'APPROVED',
  REQUIRES_REVIEW = 'REQUIRES_REVIEW',
  FLAGGED = 'FLAGGED',
  REJECTED = 'REJECTED',
}

export enum ListingStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  OFFERED = 'OFFERED',
  SOLD = 'SOLD',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  WEIGHBRIDGE_VERIFIED = 'WEIGHBRIDGE_VERIFIED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum CreditTransactionType {
  EARN_SEGREGATION = 'EARN_SEGREGATION',
  BONUS_PURITY = 'BONUS_PURITY',
  REDEEM_REWARD = 'REDEEM_REWARD',
  PENALTY_CONTAMINATION = 'PENALTY_CONTAMINATION',
  COMMUNITY_SHARE = 'COMMUNITY_SHARE',
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    details?: any;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phoneNumber?: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface HouseholdProfile {
  id: string;
  householdId: string; // e.g., "HH-DL-WZ1-0042"
  userId: string;
  societyId: string;
  localityId: string;
  flatNumber: string;
  wingBlock?: string;
  qrCodeUrl: string;
  qrCodeHash: string;
  complianceScore: number;
  society?: {
    id: string;
    name: string;
    code: string;
  };
  locality?: {
    id: string;
    name: string;
    code: string;
    ward: string;
    zone: string;
  };
  creditAccount?: {
    balance: number;
    totalEarned: number;
    totalRedeemed: number;
  };
}

export interface WasteClassificationResult {
  predictedCategory: WasteStream;
  confidence: number;
  contaminationIndex: number;
  detectedItems: string[];
  visualFeatures?: {
    colorVariance: number;
    edgeDensity: number;
    organicTextureScore: number;
  };
  verificationStatus: VerificationStatus;
  modelVersion: string;
  timestamp: string;
}

export interface CollectionRecord {
  id: string;
  householdId: string;
  collectorId?: string;
  societyId: string;
  localityId: string;
  date: string;
  status: CollectionStatus;
  wasteStreams: {
    stream: WasteStream;
    weightKg: number;
    verified: boolean;
  }[];
  totalWeightKg: number;
  gpsCoordinates?: {
    latitude: number;
    longitude: number;
    accuracyMeters?: number;
  };
  mediaUploads: string[];
  aiVerification?: WasteClassificationResult;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WasteMarketplaceListing {
  id: string;
  title: string;
  description: string;
  societyId: string;
  societyName: string;
  category: WasteStream;
  subType: string; // e.g., "PET Bottles", "Cardboard / Baled Paper", "HDPE Drums"
  quantityKg: number;
  purityGrade: 'A_PLUS' | 'A' | 'B' | 'STANDARD';
  minimumBidPerKg: number;
  pickupAddress: string;
  localityName: string;
  images: string[];
  status: ListingStatus;
  createdAt: string;
}

export interface RecyclerPurchaseRequest {
  id: string;
  listingId: string;
  recyclerId: string;
  recyclerName: string;
  offeredPricePerKg: number;
  requestedQuantityKg: number;
  notes?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
  createdAt: string;
}

export interface VehicleTelemetry {
  vehicleId: string;
  registrationNumber: string;
  collectorName: string;
  collectorPhone: string;
  status: 'ACTIVE' | 'ON_ROUTE' | 'AT_SOCIETY' | 'IDLE' | 'MAINTENANCE';
  currentLocation: {
    latitude: number;
    longitude: number;
    speedKmH: number;
    heading: number;
    lastUpdated: string;
  };
  assignedZone: string;
  assignedWard: string;
  routeProgressPercentage: number;
  todayTonnageKg: number;
}

