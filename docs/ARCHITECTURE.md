# SwachhSetu (स्वच्छसेतु) – System Architecture Document

## 1. Executive Summary & Vision
SwachhSetu ("Bridge to Cleanliness") is an enterprise-grade civic-tech platform under the **WasteChakra** circular economy paradigm, designed for Indian Municipal Corporations (MCD, BBMP, BMC, etc.), RWAs (Resident Welfare Associations), waste collectors, and authorized recyclers.

The system addresses the fundamental failure of waste management in urban India: **lack of segregation at source** and **lack of traceable custody**. It integrates a 4-stream physical sorting bag (Wet, Dry, Sanitary, and Special-Care) with digital verification, a double-entry green credit ledger, an automated B2B marketplace, and municipal command-and-control telemetry.

---

## 2. Architectural Principles & Microservices Boundary

### 2.1 Decoupled Monorepo Structure
```
swachhsetu/
├── frontend/        # React 18 + TypeScript + Vite + Tailwind CSS + Lucide + Leaflet + Recharts
├── backend/         # Node.js + Express + TypeScript + Prisma ORM + Zod + Swagger + JWT/RBAC
├── ai-service/      # Python 3.11+ + FastAPI + OpenCV + Computer Vision & Contamination Engine
├── shared/          # Shared TypeScript types, enums, DTOs, and API route contracts
├── database/        # Migrations, seed scripts, SQL definitions, ER diagrams
├── docs/            # High-level architecture, database dictionaries, API guides, deployment runbooks
└── infrastructure/  # Dockerfiles, Docker Compose, Nginx reverse proxy configs
```

### 2.2 Microservices Separation
1. **Node.js Express Backend (`:5000`)**:
   - Master REST API Gateway and Business Logic Coordinator.
   - Enforces strict JWT verification, Role-Based Access Control (RBAC), and Zod input validation.
   - Manages relational state with PostgreSQL via Prisma ORM.
   - Interacts with the AI Microservice over asynchronous internal HTTP REST.
   - Houses the Double-Entry Waste Credit Ledger preventing duplicate awards or race conditions.
   - Provides external adapter interfaces (MCD eSBM fleet tracking, S3/MinIO storage).

2. **Python FastAPI AI Verification Service (`:8000`)**:
   - Completely independent stateless microservice.
   - Specialized in multi-stream waste classification (Wet, Dry, Sanitary, Special-Care).
   - Evaluates contamination index (e.g., plastic wrappers in organic wet waste).
   - Generates confidence scores and classifies outcomes into:
     - `APPROVED`: Confidence ≥ 0.85 and Contamination ≤ 0.10
     - `REQUIRES_REVIEW`: 0.60 ≤ Confidence < 0.85 or Contamination > 0.10
     - `FLAGGED`: Severe mismatch or hazardous classification requiring human intervention.

3. **Frontend Application (`:5173`)**:
   - Responsive, modern React application.
   - Role-gated multi-dashboard structure (Resident, Collector, Society Admin, Recycler, Municipal Officer, Super Admin).
   - Live Leaflet map visualization for collector routes and vehicle fleet telemetry.
   - Real-time waste segregation feedback using camera/upload integration.
   - Instant Demo Role Switcher for seamless stakeholder review and judging.

---

## 3. The 4-Stream Waste Segregation Model
SwachhSetu standardizes urban Indian waste collection into four color-coded streams:
1. **Wet Waste (Green / Hara Dabba)**:
   - Kitchen scraps, vegetable & fruit peels, leftover cooked food, tea leaves, eggshells, garden clippings.
   - Destination: Society-level bio-methanation or decentralized composting pits.
2. **Dry Waste (Blue / Neela Dabba)**:
   - Paper, cardboard, milk pouches (rinsed & dried), PET bottles, metal cans, glass bottles, packaging plastics.
   - Destination: Society aggregation balers, sorted for B2B Recycler Marketplace.
3. **Sanitary Waste (Red / Lal Packet)**:
   - Sanitary pads, baby & adult diapers, medical swabs, used bandages.
   - Handling: Mandatory wrapping in marked paper bags with red dot indicator.
   - Destination: Municipal high-temperature biomedical incineration.
4. **Special-Care / Domestic Hazardous Waste (Yellow / Peela Box)**:
   - Expired medicines, CFL/tube lights, discarded button cells/batteries, paint residue, broken mercury thermometers, e-waste cables.
   - Destination: Authorized hazardous waste treatment, storage, and disposal facilities (TSDF).

---

## 4. End-to-End Traceability & Identifiers
- **Locality ID (`LOC-DL-WZ1-04`)**: Unique identifier for Municipal Ward, Zone, and Pincode.
- **Society ID (`SOC-MAYUR-01`)**: Unique RWA/Society identifier under a specific Locality.
- **Household ID (`HH-DL-WZ1-0042`)**: Unique resident identifier linked to a physical QR code mounted outside the resident door.
- **Collection UUID (`COL-20261122-9842`)**: Transaction identifier tracing the bag from resident doorstep through collector vehicle to weighbridge and recycler invoice.

---

## 5. Security & Compliance
- **Authentication**: JWT access tokens (15m expiry) with secure HTTP-only refresh tokens.
- **Role-Based Access Control (RBAC)**: Enforced via Express middleware `authorizeRole([UserRole.MCD_OFFICER, ...])`.
- **Data Protection**: Sensitive household addresses and contact numbers are masked for unassigned collectors and third-party recyclers.
- **Immutable Audit Logging**: Every critical action (status change, credit ledger minting, recycler verification) logs user ID, action, timestamp, and IP.

