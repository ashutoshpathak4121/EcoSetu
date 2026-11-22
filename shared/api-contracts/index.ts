// API Endpoints constants and contracts
export const API_PREFIX = '/api/v1';

export const API_ROUTES = {
  AUTH: {
    REGISTER: `${API_PREFIX}/auth/register`,
    LOGIN: `${API_PREFIX}/auth/login`,
    REFRESH: `${API_PREFIX}/auth/refresh`,
    LOGOUT: `${API_PREFIX}/auth/logout`,
    ME: `${API_PREFIX}/auth/me`,
  },
  HOUSEHOLDS: {
    ME: `${API_PREFIX}/households/me`,
    BY_ID: (id: string) => `${API_PREFIX}/households/${id}`,
    UPDATE: (id: string) => `${API_PREFIX}/households/${id}`,
    LIST_SOCIETY: (societyId: string) => `${API_PREFIX}/households/society/${societyId}`,
  },
  COLLECTIONS: {
    BASE: `${API_PREFIX}/collections`,
    BY_ID: (id: string) => `${API_PREFIX}/collections/${id}`,
    STATUS: (id: string) => `${API_PREFIX}/collections/${id}/status`,
    HOUSEHOLD_HISTORY: (householdId: string) => `${API_PREFIX}/collections/household/${householdId}`,
  },
  COLLECTOR: {
    TASKS: `${API_PREFIX}/collector/tasks`,
    EVIDENCE: (collectionId: string) => `${API_PREFIX}/collector/collections/${collectionId}/evidence`,
    STATUS: (collectionId: string) => `${API_PREFIX}/collector/collections/${collectionId}/status`,
  },
  AI: {
    VERIFY: `${API_PREFIX}/ai/verify`,
    RESULTS: (id: string) => `${API_PREFIX}/ai/results/${id}`,
  },
  CREDITS: {
    BALANCE: `${API_PREFIX}/credits/balance`,
    TRANSACTIONS: `${API_PREFIX}/credits/transactions`,
    REWARDS: `${API_PREFIX}/credits/rewards`,
    REDEEM: `${API_PREFIX}/credits/redeem`,
  },
  MARKETPLACE: {
    LISTINGS: `${API_PREFIX}/marketplace/listings`,
    LISTING_DETAIL: (id: string) => `${API_PREFIX}/marketplace/listings/${id}`,
    PURCHASE: (id: string) => `${API_PREFIX}/marketplace/listings/${id}/purchase`,
    MY_REQUESTS: `${API_PREFIX}/marketplace/my-requests`,
  },
  MUNICIPAL: {
    OVERVIEW: `${API_PREFIX}/municipal/overview`,
    ANALYTICS: `${API_PREFIX}/municipal/analytics`,
    LOCALITIES: `${API_PREFIX}/municipal/localities`,
    COLLECTIONS: `${API_PREFIX}/municipal/collections`,
    VEHICLES: `${API_PREFIX}/municipal/vehicles`,
    FLAGGED_REVIEWS: `${API_PREFIX}/municipal/flagged-reviews`,
  },
  ADMIN: {
    USERS: `${API_PREFIX}/admin/users`,
    USER_ROLE: (id: string) => `${API_PREFIX}/admin/users/${id}/role`,
    LOGS: `${API_PREFIX}/admin/logs`,
    ANALYTICS: `${API_PREFIX}/admin/analytics`,
    RECYCLER_VERIFY: (id: string) => `${API_PREFIX}/admin/recyclers/${id}/verify`,
  },
};

