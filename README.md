# 🌿 EcoSetu (स्वच्छसेतु) – Bridge to Cleanliness
### *Under the WasteChakra Circular Economy Framework*
**Developed by Team MazeRunners for Techathon 2026**

[![Tech Stack](https://img.shields.io/badge/Stack-React%2018%20%7C%20Node.js%20%7C%20PostgreSQL%20%7C%20FastAPI-2d6a4f?style=for-the-badge)](https://github.com/MazeRunners/ecosetu)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/Build-Passing-emerald?style=for-the-badge)](https://github.com/MazeRunners/ecosetu)
[![AI Engine](https://img.shields.io/badge/AI%20Microservice-ecosetu--waste--v2.1-blue?style=for-the-badge)](https://github.com/MazeRunners/ecosetu)

---

## 1. Executive Summary & Problem Solved

In urban India (MCD, BMC, BBMP), municipal corporations deploy thousands of collection tippers, yet over **70% of waste ends up as mixed toxic sludge in landfill hills** (e.g. Ghazipur, Bhalswa, Okhla). The primary bottleneck is **lack of source segregation** and **absence of custody tracking** between households, doorstep collectors, RWAs, and authorized recyclers.

**EcoSetu** solves this crisis through a physical-to-digital circular loop:

1. **The Physical Innovation**: Eliminates the burden of buying 3-4 separate dustbins. Works inside **one regular 15L-25L household dustbin** utilizing a **divided bag with distinct wet (green) and dry (blue) compartments**, alongside marked add-on pouches for sanitary waste (red dot) and domestic hazardous/special-care items (yellow container).
2. **Digital Traceability**: Unique Household IDs (`HH-DL-WZ1-0042`) and doorstep scannable QR tokens create an unbroken chain of custody.
3. **Computer Vision AI Verification**: An independent Python FastAPI microservice audits photographic evidence, evaluates cross-stream contamination, and flags mixed waste.
4. **Double-Entry Green Credit Ledger**: Transparent, fraud-proof transaction ledger rewarding households with credits redeemable for enriched bio-compost, biodegradable bin liners, and official MCD property tax rebates.
5. **B2B Circular Recycler Marketplace**: Societies compress pure recyclables into bales and trade directly with authorized CPCB recyclers through digital manifests and escrow settlement.

---

## 2. The 4-Stream Waste Segregation Architecture

| Stream | Compartment / Arrangement | Target Materials | Handling Protocol | Final Destination |
|---|---|---|---|---|
| **🟢 Wet Waste** | Green section of divided bag | Vegetable/fruit peels, cooked leftovers, tea leaves, eggshells | Drain excess liquid; no wrappers | Society bio-digester or composting pit |
| **🔵 Dry Recyclables** | Blue section of divided bag | Paper, cardboard boxes, rinsed milk pouches, PET bottles, metal cans | Rinse and dry; flatten cardboard | Society baler & B2B recycler marketplace |
| **🔴 Sanitary Waste** | Red dot add-on pouch | Sanitary napkins, adult/baby diapers, medical bandages, gauze | Wrap in newspaper with RED DOT | High-temperature municipal incinerator |
| **🟡 Special-Care / Haz** | Yellow safe-box container | Batteries, CFL/tube lights, e-waste cables, blister packs | Rigid container; do not break glass | Authorized hazardous TSDF facility |

---

## 3. Technology Stack

### Frontend Application
- **Framework**: React 18 with TypeScript & Vite
- **Styling**: Tailwind CSS with custom Indian Civic Palette (Forest Green, Charcoal, Off-White, Amber)
- **State & Routing**: React Router v6, TanStack Query v5, Context API
- **Visualizations & Maps**: Recharts (multi-stream bar & pie charts), Leaflet with OpenStreetMap
- **Icons & Motion**: Lucide React, Framer Motion

### Main Backend REST Gateway
- **Runtime & Language**: Node.js v20+ with Express.js & TypeScript
- **Relational ORM**: Prisma ORM with strict relational schema & foreign keys
- **Security**: JWT authentication, Role-Based Access Control (RBAC), Helmet, Express Rate Limit
- **Validation**: Zod schema validation
- **Documentation**: Interactive OpenAPI / Swagger UI at `/api-docs`

### Independent AI Verification Microservice
- **Runtime**: Python 3.11+
- **Framework**: FastAPI with Pydantic v2 schemas
- **Computer Vision**: OpenCV, PIL (Pillow), NumPy feature extraction (edge density, colorimetric distribution, contamination entropy)
- **Model Version**: `ecosetu-waste-v2.1`

### Database & Storage
- **Database**: PostgreSQL 16
- **Object Storage**: S3-compatible adapter interface with local disk driver for development

---

## 4. Strict Monorepo Architecture

```
ecosetu/
├── frontend/                     # React 18 + TS + Vite + Tailwind application
│   ├── src/
│   │   ├── components/           # Reusable UI widgets (LeafletMap, AIVerificationCard, StatCard)
│   │   ├── context/              # AuthContext with 1-click Demo Role Switcher
│   │   ├── layouts/              # PublicLayout, DashboardLayout
│   │   ├── pages/
│   │   │   ├── resident/         # Household QR, AI scanner, Request pickup, Credits, Rewards
│   │   │   ├── collector/        # Assigned route checklist, GIS map, Proof & weights logger
│   │   │   ├── society/          # RWA flat directory, Marketplace lot publisher
│   │   │   ├── recycler/         # Browse verified lots, Bidding, Orders & Manifests
│   │   │   ├── municipal/        # City overview, Fleet GPS telemetry, Flagged AI review
│   │   │   └── admin/            # RBAC user manager, Cryptographic audit logs
│   │   ├── routes/               # Modular app routing
│   │   └── services/             # Axios API services matching backend contracts
│   ├── .env.example
│   └── package.json
│
├── backend/                      # Node.js + Express + TypeScript REST API
│   ├── src/
│   │   ├── config/               # Environment, Prisma client, Swagger OpenAPI
│   │   ├── controllers/          # Modular HTTP controllers
│   │   ├── integrations/         # AI microservice client, GPS fleet adapter, Storage adapter
│   │   ├── middleware/           # JWT auth, RBAC authorization, Zod validation, Error handler
│   │   ├── routes/               # Versioned REST endpoints mounted under /api/v1
│   │   ├── services/             # Domain logic (Double-entry credit ledger, Collection engine)
│   │   ├── tests/                # Automated Jest / Supertest integration test suite
│   │   └── validators/           # Zod schemas for request validation
│   ├── prisma/
│   │   ├── schema.prisma         # 22 relational models with composite indices
│   │   └── seed.ts               # Seed data for Indian municipal wards & households
│   ├── .env.example
│   └── package.json
│
├── ai-service/                   # Python FastAPI Computer Vision microservice
│   ├── app/
│   │   ├── api/                  # /api/v1/verify and /health endpoints
│   │   ├── core/                 # Settings and confidence thresholds
│   │   ├── models/               # Waste stream classifier and contamination analyzer
│   │   ├── schemas/              # Pydantic v2 schemas
│   │   ├── services/             # VerificationService with manual review fallback
│   │   └── main.py               # FastAPI application entrypoint
│   ├── tests/                    # Pytest test suite for AI verification
│   ├── requirements.txt
│   └── .env.example
│
├── shared/                       # Shared TypeScript contracts, DTOs, and API route paths
├── docs/                         # ARCHITECTURE, DATABASE, API_DOCUMENTATION, DEPLOYMENT
├── infrastructure/               # Dockerfiles & Nginx reverse proxy configuration
├── docker-compose.yml            # Multi-container orchestration (PG16, Node, Python, React)
└── package.json                  # Root workspace orchestration
```

---

## 5. Instant Role Evaluation & Demo Accounts

The frontend includes an **Evaluation Bar** sticky at the top, allowing judges to test every role in 1 click without typing passwords:

| Role | Demo Email | Password | Primary Workflow |
|---|---|---|---|
| **Resident** | `resident@ecosetu.in` | `Password@123` | View Doorstep QR (`HH-DL-WZ1-0042`), AI waste scan, Green Credits wallet, Rewards store |
| **Collector** | `collector@ecosetu.in` | `Password@123` | Active collection beat (Ward 203), doorstep QR checklist, Log geo-tagged weights & photo |
| **Society Admin** | `society@ecosetu.in` | `Password@123` | Gulmohar Enclave RWA (160 flats), resident compliance leaderboard, list B2B recyclable lots |
| **Recycler** | `recycler@ecosetu.in` | `Password@123` | GreenEarth Recyclers (CPCB licensed), browse verified bales, submit purchase bids, manifests |
| **MCD Officer** | `mcd@ecosetu.in` | `Password@123` | East Delhi MCD command center, live GPS fleet telemetry, AI flagged review queue, CSV export |
| **Super Admin** | `admin@ecosetu.in` | `Password@123` | RBAC role management, CPCB recycler KYC verification, immutable system audit logs |

---

## 6. Local Quickstart Guide

### Option A: Automated Multi-Container Docker Compose
```bash
# Clone the repository
git clone https://github.com/MazeRunners/ecosetu.git
cd ecosetu

# Run the complete ecosystem
docker compose up --build
```
Access points:
- **Frontend App**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`
- **Interactive Swagger Docs**: `http://localhost:5000/api-docs`
- **AI Verification Service**: `http://localhost:8000`
- **AI OpenAPI Docs**: `http://localhost:8000/docs`

---

### Option B: Local Standalone Development

#### 1. Start AI Microservice
```bash
cd ai-service
# Create and activate virtualenv
python -m venv venv
# On Windows: .\venv\Scripts\activate  |  On Linux: source venv/bin/activate
pip install -r requirements.txt

# Run FastAPI server
uvicorn app.main:app --port 8000 --reload
```

#### 2. Start Backend API
```bash
cd backend
npm install
npx prisma generate
npm run dev
```

#### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to explore EcoSetu.

---

## 7. Automated Test Suites

```bash
# Run AI Microservice Pytest Suite
$env:PYTHONPATH="ai-service"; python -m pytest ai-service/tests

# Run Backend Jest Integration Test Suite (Auth, Collections, Credits, RBAC)
cd backend && npm test

# Verify Frontend Production TypeScript Build
cd frontend && npm run build
```

---

## 8. Team MazeRunners (Techathon 2026)
*Engineering scalable civic technology for clean, circular, and transparent Indian cities.*

