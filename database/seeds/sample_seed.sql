-- SwachhSetu Techathon 2026 Seed Fixtures
-- Target Database: PostgreSQL 16
-- Note: When running through Prisma, execute `npx prisma db seed` instead.

-- 1. Locality
INSERT INTO "Locality" ("id", "name", "wardNumber", "zone", "city", "state", "pincode", "createdAt", "updatedAt")
VALUES ('loc-east-delhi-42', 'Mayur Vihar Phase 1', '42', 'East Delhi', 'Delhi', 'Delhi', '110091', NOW(), NOW())
ON CONFLICT ("id") DO NOTHING;

-- 2. Core Demo Users (Password: Password@123, bcrypt salt rounds: 10)
-- Hash: $2a$10$7Z2vA4Q50tC5w6aUu8eQp.vY36L2R2H2e5c8D6m/Hj8gXz8y8r7u
INSERT INTO "User" ("id", "email", "passwordHash", "name", "role", "phone", "status", "createdAt", "updatedAt")
VALUES
('usr-super-admin-01', 'admin@swachhsetu.in', '$2a$10$7Z2vA4Q50tC5w6aUu8eQp.vY36L2R2H2e5c8D6m/Hj8gXz8y8r7u', 'Dr. Ramesh Sharma', 'SUPER_ADMIN', '+919876543210', 'ACTIVE', NOW(), NOW()),
('usr-resident-01', 'resident@swachhsetu.in', '$2a$10$7Z2vA4Q50tC5w6aUu8eQp.vY36L2R2H2e5c8D6m/Hj8gXz8y8r7u', 'Pooja Verma', 'RESIDENT', '+919811223344', 'ACTIVE', NOW(), NOW()),
('usr-collector-01', 'collector@swachhsetu.in', '$2a$10$7Z2vA4Q50tC5w6aUu8eQp.vY36L2R2H2e5c8D6m/Hj8gXz8y8r7u', 'Suresh Kumar', 'COLLECTOR', '+919822334455', 'ACTIVE', NOW(), NOW()),
('usr-society-01', 'society@swachhsetu.in', '$2a$10$7Z2vA4Q50tC5w6aUu8eQp.vY36L2R2H2e5c8D6m/Hj8gXz8y8r7u', 'Anil Mehta (RWA President)', 'SOCIETY_ADMIN', '+919833445566', 'ACTIVE', NOW(), NOW()),
('usr-mcd-01', 'mcd@swachhsetu.in', '$2a$10$7Z2vA4Q50tC5w6aUu8eQp.vY36L2R2H2e5c8D6m/Hj8gXz8y8r7u', 'Inspector Vikram Malhotra', 'MCD_OFFICER', '+919844556677', 'ACTIVE', NOW(), NOW()),
('usr-recycler-01', 'recycler@swachhsetu.in', '$2a$10$7Z2vA4Q50tC5w6aUu8eQp.vY36L2R2H2e5c8D6m/Hj8gXz8y8r7u', 'Rajesh Gupta (EcoRecycle)', 'RECYCLER', '+919855667788', 'ACTIVE', NOW(), NOW())
ON CONFLICT ("id") DO NOTHING;

-- 3. Society
INSERT INTO "Society" ("id", "name", "address", "registrationNo", "totalHouseholds", "localityId", "adminId", "createdAt", "updatedAt")
VALUES ('soc-green-meadows-01', 'Green Meadows Residency', 'Pocket 1, Mayur Vihar Phase 1', 'RWA/DEL/2018/489', 140, 'loc-east-delhi-42', 'usr-society-01', NOW(), NOW())
ON CONFLICT ("id") DO NOTHING;

-- 4. Vehicle
INSERT INTO "Vehicle" ("id", "registrationNumber", "model", "capacityKg", "status", "batteryPercent", "currentLatitude", "currentLongitude", "currentDriverId", "createdAt", "updatedAt")
VALUES ('veh-dl-01-ga-4892', 'DL-01-GA-4892', 'Tata Ace EV Electric Tipper', 800.0, 'EN_ROUTE', 88.0, 28.6089, 77.2954, 'usr-collector-01', NOW(), NOW())
ON CONFLICT ("id") DO NOTHING;
