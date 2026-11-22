import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'SwachhSetu REST API',
    version: '1.0.0',
    description:
      'Backend API service for SwachhSetu – Bridge to Cleanliness | WasteChakra Concept by Team MazeRunners (Techathon 2026)',
    contact: {
      name: 'Team MazeRunners',
      email: 'techathon2026@swachhsetu.in',
    },
  },
  servers: [
    {
      url: '/api/v1',
      description: 'API v1 Gateway',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Error description' },
          error: {
            type: 'object',
            properties: {
              code: { type: 'string', example: 'VALIDATION_ERROR' },
              details: { type: 'object' },
            },
          },
        },
      },
      User: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          email: { type: 'string' },
          name: { type: 'string' },
          role: {
            type: 'string',
            enum: ['RESIDENT', 'COLLECTOR', 'SOCIETY_ADMIN', 'RECYCLER', 'MCD_OFFICER', 'SUPER_ADMIN'],
          },
        },
      },
      Collection: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          collectionCode: { type: 'string' },
          householdId: { type: 'string' },
          status: {
            type: 'string',
            enum: ['PENDING', 'ASSIGNED', 'COLLECTOR_ON_THE_WAY', 'COLLECTED', 'VERIFIED', 'REQUIRES_REVIEW'],
          },
          totalWeightKg: { type: 'number' },
          wetWeightKg: { type: 'number' },
          dryWeightKg: { type: 'number' },
          sanitaryWeightKg: { type: 'number' },
          specialCareWeightKg: { type: 'number' },
        },
      },
    },
  },
  paths: {
    '/auth/register': {
      post: {
        summary: 'Register a new user',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password', 'name', 'role'],
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string', minLength: 6 },
                  name: { type: 'string' },
                  role: { type: 'string', enum: ['RESIDENT', 'COLLECTOR', 'SOCIETY_ADMIN', 'RECYCLER'] },
                  phoneNumber: { type: 'string' },
                  societyId: { type: 'string' },
                  flatNumber: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'User successfully registered' },
          400: { description: 'Validation failed or email already exists' },
        },
      },
    },
    '/auth/login': {
      post: {
        summary: 'Authenticate and receive JWT token',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Authentication successful' },
          401: { description: 'Invalid credentials' },
        },
      },
    },
    '/households/me': {
      get: {
        summary: 'Get authenticated resident household profile',
        tags: ['Households'],
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: 'Household profile' },
        },
      },
    },
    '/collections': {
      get: {
        summary: 'List collections with filtering',
        tags: ['Collections'],
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: 'Collection records list' },
        },
      },
      post: {
        summary: 'Create waste collection pickup request',
        tags: ['Collections'],
        security: [{ BearerAuth: [] }],
        responses: {
          201: { description: 'Collection request scheduled' },
        },
      },
    },
    '/ai/verify': {
      post: {
        summary: 'Analyze waste image through AI Microservice',
        tags: ['AI Verification'],
        responses: {
          200: { description: 'AI stream classification result' },
        },
      },
    },
    '/credits/balance': {
      get: {
        summary: 'Get resident Green Credit balance and tier',
        tags: ['Credits Ledger'],
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: 'Current credit balance' },
        },
      },
    },
    '/marketplace/listings': {
      get: {
        summary: 'Browse available verified recyclable waste listings',
        tags: ['Marketplace'],
        responses: {
          200: { description: 'List of marketplace waste lots' },
        },
      },
    },
    '/municipal/overview': {
      get: {
        summary: 'Get Municipal Command Center city-wide metrics',
        tags: ['Municipal'],
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: 'MCD overview statistics' },
        },
      },
    },
  },
};

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocument);
  });
}

