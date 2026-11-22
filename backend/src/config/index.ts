import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://ecosetu:ecosetu_password_2026@localhost:5432/ecosetu_db?schema=public',
  jwt: {
    secret: process.env.JWT_SECRET || 'ecosetu_jwt_secret_dev_2026_super_secure_key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'ecosetu_refresh_secret_2026',
  },
  aiService: {
    url: process.env.AI_SERVICE_URL || 'http://localhost:8000',
    timeoutMs: 15000,
  },
  corsOrigin: process.env.CORS_ORIGIN || '*',
  storageDriver: (process.env.STORAGE_DRIVER || 'local') as 'local' | 's3',
  uploadDir: process.env.UPLOAD_DIR || 'uploads',
};

