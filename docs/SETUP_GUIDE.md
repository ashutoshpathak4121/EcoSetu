# EcoSetu – Local Setup & Development Guide

Follow this guide to get EcoSetu up and running on your local machine.

## Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **Python**: v3.10+ (for AI Microservice)
- **PostgreSQL**: v14+ (or Docker)
- **npm** or **pnpm**

---

## 1. Quick Start with Docker Compose (Recommended)
The fastest way to spin up the entire ecosystem (PostgreSQL, Node.js Backend, FastAPI AI Service, and React Frontend):

```bash
# Clone the repository
git clone https://github.com/MazeRunners/ecosetu.git
cd ecosetu

# Run the automated docker compose stack
docker compose up --build
```
Services will be accessible at:
- **Frontend App**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`
- **Swagger Docs**: `http://localhost:5000/api-docs`
- **AI Microservice**: `http://localhost:8000`
- **AI Docs**: `http://localhost:8000/docs`
- **PostgreSQL**: `localhost:5432`

---

## 2. Manual Step-by-Step Local Setup

### Step 2.1: Shared Library
```bash
# From workspace root
cd shared
# Types and API contracts are imported by backend and frontend
```

### Step 2.2: Backend Setup
```bash
cd backend
cp .env.example .env
npm install

# Generate Prisma Client & Run Seed Data
npx prisma generate
npx prisma db push # or npx prisma migrate dev
npm run seed

# Start Backend Dev Server
npm run dev
```

### Step 2.3: AI Microservice Setup
```bash
cd ai-service
# Create and activate Python virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env

# Run FastAPI server
uvicorn app.main:app --reload --port 8000
```

### Step 2.4: Frontend Setup
```bash
cd frontend
cp .env.example .env
npm install

# Start Vite React Dev Server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 3. Seed Accounts for Testing
The database seed script generates pre-configured accounts for all roles:

| Role | Email | Password | Details |
|---|---|---|---|
| **Resident** | `resident@ecosetu.in` | `Password@123` | Flat B-402, Gulmohar Enclave (HH-DL-WZ1-0042) |
| **Collector** | `collector@ecosetu.in` | `Password@123` | Staff ID: COL-EMP-108, Assigned Ward 203 |
| **Society Admin** | `society@ecosetu.in` | `Password@123` | RWA President, Gulmohar Enclave |
| **Recycler** | `recycler@ecosetu.in` | `Password@123` | GreenEarth Recyclers Pvt Ltd (Authorized CPCB) |
| **MCD Officer** | `mcd@ecosetu.in` | `Password@123` | Sanitation Superintendent, East Delhi MCD |
| **Super Admin** | `admin@ecosetu.in` | `Password@123` | Platform Administrator |

*Note: You can also use the **Quick Demo Switcher** bar at the top of the frontend to switch instantly between any of these roles with 1 click.*

