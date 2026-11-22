import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import rateLimit from 'express-rate-limit';
import apiRouter from './routes';
import { setupSwagger } from './config/swagger';
import { errorHandler } from './middleware/error.middleware';
import { config } from './config';

export const app = express();

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// CORS configuration
app.use(
  cors({
    origin: config.corsOrigin === '*' ? true : config.corsOrigin,
    credentials: true,
  })
);

// Request parsing
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Global API rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 15 minutes.',
    error: { code: 'RATE_LIMIT_EXCEEDED' },
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Serve uploads
app.use('/uploads', express.static(path.resolve(process.cwd(), config.uploadDir)));

// Setup Swagger documentation
setupSwagger(app);

// Mount API routes
app.use('/api/v1', apiRouter);

// Root health & welcome
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'EcoSetu - Waste Management Ecosystem API Gateway',
    documentation: '/api-docs',
    version: '1.0.0',
    health: '/api/v1/health',
  });
});

// Centralized error handling
app.use(errorHandler);

