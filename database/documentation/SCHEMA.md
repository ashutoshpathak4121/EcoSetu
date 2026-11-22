# EcoSetu – Relational Database Schema Specification
**Engine:** PostgreSQL 16  
**ORM:** Prisma ORM  
**Namespace:** `public`  

---

## 1. Core Entity Relationship Overview

```
Locality (1) ───< Society (N) ───< Household (N) ─── User (1)
                                        │
                                        ├───< Collection (N) ─── AIVerificationRecord (1)
                                        │                           └─── MediaUpload (1)
                                        └───< CreditAccount (1) ───< CreditTransaction (N)

Society (1) ───< WasteListing (N) ───< PurchaseRequest (N) ───< Order (1)
                                              ^
                                              │ (Bidding)
                                       User/Recycler (1)

User/Collector (1) ───< Vehicle (1) ───< GPSWaypoint (N)
```

---

## 2. Table Catalog

| Table Name | Primary Key | Key Foreign Keys | Purpose |
| :--- | :--- | :--- | :--- |
| `User` | `id` (UUID) | None | System accounts across 6 RBAC roles |
| `Household` | `id` (UUID) | `userId`, `societyId` | Household segregation unit with QR identification |
| `Society` | `id` (UUID) | `localityId`, `adminId` | Residential housing society / apartment complex |
| `Locality` | `id` (UUID) | None | Municipal ward and zone boundary (e.g. Ward 42 East Delhi) |
| `Collection` | `id` (UUID) | `householdId`, `collectorId` | Segregation collection event across 4 streams |
| `AIVerificationRecord` | `id` (UUID) | `collectionId`, `mediaUploadId` | Computer vision classification record |
| `MediaUpload` | `id` (UUID) | `uploaderId` | Image/video metadata (local or S3 URL, SHA-256 hash) |
| `CreditAccount` | `id` (UUID) | `householdId` | Running balance for household reward credits |
| `CreditTransaction` | `id` (UUID) | `creditAccountId` | Immutable ledger entry with idempotency key |
| `Reward` | `id` (UUID) | None | Catalog of redeemable civic utilities and vouchers |
| `RewardRedemption` | `id` (UUID) | `creditAccountId`, `rewardId` | Reward claim voucher |
| `WasteListing` | `id` (UUID) | `societyId` | Aggregated recyclable waste lot (dry waste, plastics, metals) |
| `PurchaseRequest` | `id` (UUID) | `listingId`, `recyclerId` | B2B purchase bid from authorized recycler |
| `Order` | `id` (UUID) | `listingId`, `recyclerId` | Executed circular economy trade with digital manifest |
| `Vehicle` | `id` (UUID) | `currentDriverId` | Municipal sanitation truck (e.g. DL-01-GA-4892) |
| `AuditLog` | `id` (UUID) | `userId` | Immutable security audit trail |

---

## 3. Financial Integrity & Double-Entry Ledger
The `CreditTransaction` table enforces:
- `idempotencyKey` UNIQUE constraint to guarantee at-most-once credit award for any collection event.
- Negative transactions for redemptions (`amount < 0`), positive transactions for collection awards (`amount > 0`).
- Relational integrity preventing deletion of history (`onDelete: Restrict`).
