# EcoSetu – API Specification & Contracts

Base URL: `/api/v1`  
Interactive Swagger UI: `http://localhost:5000/api-docs`

---

## 1. Authentication Endpoints
- `POST /api/v1/auth/register`
  - Body: `{ email, password, name, phoneNumber, role, societyId?, flatNumber? }`
  - Response: `{ success: true, token, user }`
- `POST /api/v1/auth/login`
  - Body: `{ email, password }`
  - Response: `{ success: true, token, user }`
- `GET /api/v1/auth/me`
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ success: true, user, profile }`
- `POST /api/v1/auth/logout`

---

## 2. Household Endpoints
- `GET /api/v1/households/me`
  - Retrieves authenticated resident's household details, QR code, credit balance, and assigned collector.
- `GET /api/v1/households/:id`
  - Authorized for Household owner, assigned Collector, Society Admin, or MCD Officer.
- `PUT /api/v1/households/:id`
  - Updates profile metadata.

---

## 3. Waste Collection & Workflow Endpoints
- `POST /api/v1/collections`
  - Body: `{ householdId, scheduledDate, notes, wasteStreams: [{ stream, estimatedKg }] }`
  - Transitions to `PENDING` -> `ASSIGNED`.
- `GET /api/v1/collections`
  - Query params: `?status=VERIFIED&localityId=...&page=1&limit=20`
- `GET /api/v1/collections/:id`
  - Full details with AI verification and media uploads.
- `PATCH /api/v1/collections/:id/status`
  - Body: `{ status, rejectionReason? }`
- `GET /api/v1/collections/household/:householdId`
  - History of collections for a given household.

---

## 4. Waste Collector Endpoints
- `GET /api/v1/collector/tasks`
  - Retrieves active assigned route, target households, and society check-ins for the day.
- `POST /api/v1/collector/collections/:id/evidence`
  - Form-data: `image` (file), `latitude`, `longitude`, `wetKg`, `dryKg`, `sanitaryKg`, `specialCareKg`
  - Automatically triggers asynchronous AI verification microservice call.
- `PATCH /api/v1/collector/collections/:id/status`
  - Updates task lifecycle to `COLLECTOR_ON_THE_WAY` or `COLLECTED`.

---

## 5. AI Verification Service Endpoints
- `POST /api/v1/ai/verify` (Backend to AI Microservice or direct)
  - Accepts image multipart or JSON base64.
  - Returns:
    ```json
    {
      "success": true,
      "classification": {
        "predictedCategory": "DRY",
        "confidence": 0.94,
        "contaminationIndex": 0.04,
        "detectedItems": ["cardboard_box", "pet_bottle_crushed", "newspaper_bundle"]
      },
      "verificationStatus": "APPROVED",
      "modelVersion": "ecosetu-waste-v2.1"
    }
    ```
- `GET /api/v1/ai/results/:id`

---

## 6. Waste Credit Ledger Endpoints
- `GET /api/v1/credits/balance`
  - Returns current balance, tier level (Green Citizen, Eco Champion), and lifetime earned credits.
- `GET /api/v1/credits/transactions`
  - Paginated list of ledger entries with cryptographic idempotency keys.
- `GET /api/v1/credits/rewards`
  - Catalogue of redeemable rewards (e.g. 5kg Organic Compost Bag, Compostable Bin Liners, MCD Property Tax Rebate Coupon, Metro Smart Card Recharge).
- `POST /api/v1/credits/redeem`
  - Body: `{ rewardId }`
  - Deducts credits atomically and issues redemption coupon code.

---

## 7. B2B Recycler Marketplace Endpoints
- `GET /api/v1/marketplace/listings`
  - Filter by category (`DRY`, `WET_COMPOST`, `E_WASTE`), purity grade (`A_PLUS`, `A`), locality.
- `POST /api/v1/marketplace/listings`
  - Authorized for Society Admins. Creates bulk lot listing.
- `POST /api/v1/marketplace/listings/:id/purchase`
  - Authorized for Verified Recyclers. Submits bid or immediate purchase order.
- `GET /api/v1/marketplace/my-requests`

---

## 8. Municipal Corporation (MCD) Dashboard Endpoints
- `GET /api/v1/municipal/overview`
  - High-level KPIs: Total households registered, total metric tons collected today, 4-stream ratio, ward compliance leaderboard.
- `GET /api/v1/municipal/analytics`
  - Time-series segregation trends, contamination rate by ward.
- `GET /api/v1/municipal/vehicles`
  - Real-time GPS coordinates, route status, and collection progress of sanitation trucks.
- `GET /api/v1/municipal/flagged-reviews`
  - Queued AI verification records marked `REQUIRES_REVIEW` or `FLAGGED` for human officer adjudication.

---

## 9. Super Admin Endpoints
- `GET /api/v1/admin/users`
- `PATCH /api/v1/admin/users/:id/role`
- `GET /api/v1/admin/logs`
- `PATCH /api/v1/admin/recyclers/:id/verify`

