# EcoSetu – Database Architecture & Entity Relationship Design

## 1. Overview
The database uses **PostgreSQL 16** managed through **Prisma ORM**. The schema is strictly normalized (3NF), enforces referential integrity through foreign key constraints, implements unique constraints on business identifiers, and features b-tree composite indexes on frequently filtered query paths.

---

## 2. Mermaid Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    User ||--o{ Household : "registers"
    User ||--o{ Collector : "operates as"
    User ||--o{ SocietyAdmin : "manages"
    User ||--o{ RecyclerProfile : "owns"
    User ||--o{ AuditLog : "triggers"
    User ||--o{ Notification : "receives"

    Locality ||--o{ Society : "contains"
    Locality ||--o{ Collector : "assigned to"
    Locality ||--o{ Vehicle : "operates in"

    Society ||--o{ Household : "houses"
    Society ||--o{ WasteListing : "lists waste"

    Household ||--o{ Collection : "requests"
    Household ||--|| CreditAccount : "owns balance"

    CreditAccount ||--o{ CreditTransaction : "records"
    CreditAccount ||--o{ RewardRedemption : "spends"
    Reward ||--o{ RewardRedemption : "redeemed by"

    Collector ||--o{ Collection : "collects"
    Collector ||--o| Vehicle : "drives"

    Collection ||--|| AIVerificationRecord : "verified by"
    Collection ||--o{ MediaUpload : "contains photos"

    WasteListing ||--o{ PurchaseRequest : "receives bids"
    RecyclerProfile ||--o{ PurchaseRequest : "submits"
    PurchaseRequest ||--o| Order : "converted into"

    User {
        string id PK
        string email UK
        string passwordHash
        string name
        string phoneNumber UK
        string role
        datetime createdAt
    }

    Locality {
        string id PK
        string code UK "LOC-DL-WZ1-04"
        string name "Mayur Vihar Phase 1"
        string ward "Ward 203"
        string zone "East Zone"
        string city "New Delhi"
        string pincode "110091"
    }

    Society {
        string id PK
        string code UK "SOC-GULM-01"
        string name "Gulmohar Enclave RWA"
        string localityId FK
        string address
        int totalFlats
    }

    Household {
        string id PK
        string householdId UK "HH-DL-WZ1-0042"
        string userId FK
        string societyId FK
        string localityId FK
        string flatNumber "B-402"
        string wingBlock "Block B"
        string qrCodeHash UK
        float complianceScore
    }

    Collection {
        string id PK
        string collectionCode UK "COL-202611-001"
        string householdId FK
        string collectorId FK
        string societyId FK
        string localityId FK
        string status "VERIFIED"
        float totalWeightKg
        float wetWeightKg
        float dryWeightKg
        float sanitaryWeightKg
        float specialCareWeightKg
        float latitude
        float longitude
        datetime collectedAt
    }

    AIVerificationRecord {
        string id PK
        string collectionId FK,UK
        string predictedCategory
        float confidence
        float contaminationIndex
        string verificationStatus "APPROVED"
        string modelVersion
        json detectedItems
    }

    CreditAccount {
        string id PK
        string householdId FK,UK
        int balance
        int totalEarned
        int totalRedeemed
    }

    CreditTransaction {
        string id PK
        string accountId FK
        int amount
        string type "EARN_SEGREGATION"
        string idempotencyKey UK
        string referenceId
        datetime createdAt
    }

    WasteListing {
        string id PK
        string societyId FK
        string category "DRY"
        string subType "Baled PET Bottles"
        float quantityKg
        string purityGrade "A_PLUS"
        float minimumBidPerKg
        string status "ACTIVE"
    }
```

---

## 3. Database Indices & Performance Strategy
- `Household`: Index on `[societyId]`, `[localityId]`, and unique index on `householdId`.
- `Collection`: Composite index on `[householdId, createdAt]`, `[status]`, `[collectorId, status]`, and `[localityId, createdAt]`.
- `CreditTransaction`: Unique index on `idempotencyKey` prevents double-crediting if requests are retried.
- `AIVerificationRecord`: Index on `[verificationStatus, confidence]` for fast municipal flagged audit lookups.
- `WasteListing`: Index on `[status, category, purityGrade]` for marketplace search.

