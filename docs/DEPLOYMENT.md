# SwachhSetu – Production Deployment Architecture

## 1. Production Architecture
In production, SwachhSetu is deployed behind an **Nginx Reverse Proxy** or Cloud Application Load Balancer with SSL termination (Let's Encrypt / AWS ACM):

```
Client (Browser / Mobile PWA)
           │
           ▼ (HTTPS :443)
    [ Nginx Reverse Proxy ]
           ├─ /api/v1/ai/ ───► [ Python AI Microservice (Uvicorn / Gunicorn) :8000 ]
           ├─ /api/v1/    ───► [ Node.js Express Cluster (PM2 / ECS) :5000 ]
           └─ /           ───► [ React Production Static Build (Nginx) ]
```

---

## 2. Environment Variables Matrix

### Backend (`backend/.env`)
- `PORT`: `5000`
- `NODE_ENV`: `production`
- `DATABASE_URL`: `postgresql://swachh_user:secret_pw@db.cluster.internal:5432/swachhsetu_prod?schema=public&sslmode=prefer`
- `JWT_SECRET`: High-entropy 256-bit random string
- `JWT_EXPIRES_IN`: `15m`
- `JWT_REFRESH_SECRET`: High-entropy string
- `AI_SERVICE_URL`: `http://ai-service:8000`
- `CORS_ORIGIN`: `https://swachhsetu.in`
- `STORAGE_DRIVER`: `s3` (or `local`)
- `AWS_S3_BUCKET`: `swachhsetu-production-media`
- `AWS_REGION`: `ap-south-1` (Mumbai)

### AI Service (`ai-service/.env`)
- `AI_ENV`: `production`
- `PORT`: `8000`
- `CONFIDENCE_THRESHOLD_APPROVED`: `0.85`
- `CONFIDENCE_THRESHOLD_REVIEW`: `0.60`
- `CONTAMINATION_THRESHOLD_FLAG`: `0.10`
- `MODEL_VERSION`: `swachhsetu-waste-v2.1`

### Frontend (`frontend/.env`)
- `VITE_API_BASE_URL`: `/api/v1`
- `VITE_APP_TITLE`: `SwachhSetu - Waste Management Ecosystem`
- `VITE_MCD_PORTAL_ENABLED`: `true`

---

## 3. Database Migration & Rollback Strategy
```bash
# Production zero-downtime migration
npx prisma migrate deploy

# Monitoring active connection pool
SELECT count(*), state FROM pg_stat_activity GROUP BY state;
```

---

## 4. Disaster Recovery & Backups
1. Automated daily snapshots of PostgreSQL via `pg_dump` or AWS RDS automated snapshots with 30-day retention.
2. Media files stored in S3 with bucket versioning and multi-region replication.

