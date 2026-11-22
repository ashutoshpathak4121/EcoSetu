# Database Architecture & Seeding Strategy

This directory contains database documentation, migration strategies, and seed definitions for SwachhSetu.

## Production Database
- **Engine**: PostgreSQL 16
- **Management**: Prisma ORM
- **Primary Schema**: `backend/prisma/schema.prisma`
- **Seed Script**: `backend/prisma/seed.ts`

## Key Relations
1. `Locality` (Ward & Zone) -> `Society` (Residential complexes) -> `Household` (Individual flats)
2. `Household` -> `Collection` -> `AIVerificationRecord` & `MediaUpload`
3. `Household` -> `CreditAccount` -> `CreditTransaction` (Double-entry ledger with idempotency keys)
4. `Society` -> `WasteListing` -> `PurchaseRequest` -> `Order` (B2B Marketplace)
5. `Collector` -> `Vehicle` -> Telemetry tracking integration

