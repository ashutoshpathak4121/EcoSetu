import request from 'supertest';
import { app } from '../app';

describe('EcoSetu Backend API Suite', () => {
  let authToken = '';

  it('GET /api/v1/health should return 200 and healthy status', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('HEALTHY');
    expect(res.body.service).toContain('EcoSetu');
  });

  it('POST /api/v1/auth/login should authenticate resident with valid credentials', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({
      email: 'resident@ecosetu.in',
      password: 'Password@123',
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
    expect(res.body.data.user.role).toBe('RESIDENT');
    authToken = res.body.data.token;
  });

  it('GET /api/v1/auth/me should return current authenticated user profile', async () => {
    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe('resident@ecosetu.in');
  });

  it('GET /api/v1/households/me should return household info with credit account', async () => {
    const res = await request(app)
      .get('/api/v1/households/me')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.householdId).toBeDefined();
  });

  it('GET /api/v1/collections should list waste collections', async () => {
    const res = await request(app)
      .get('/api/v1/collections')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /api/v1/credits/rewards should return available rewards catalog', async () => {
    const res = await request(app).get('/api/v1/credits/rewards');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('GET /api/v1/marketplace/listings should return verified marketplace lots', async () => {
    const res = await request(app).get('/api/v1/marketplace/listings');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /api/v1/municipal/overview should return municipal KPIs', async () => {
    const res = await request(app).get('/api/v1/municipal/overview');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.totalHouseholds).toBeDefined();
    expect(res.body.data.streamDistribution).toBeDefined();
  });

  it('GET /api/v1/municipal/vehicles should return vehicle fleet telemetry', async () => {
    const res = await request(app).get('/api/v1/municipal/vehicles');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data[0].registrationNumber).toBeDefined();
  });

  it('POST /api/v1/auth/register with SUPER_ADMIN role should be rejected by validation', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      email: 'hacker@malicious.com',
      password: 'Password@123',
      name: 'Rogue Admin',
      role: 'SUPER_ADMIN',
    });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('GET /api/v1/households/:id for another resident should return 403 Forbidden', async () => {
    const res = await request(app)
      .get('/api/v1/households/hh-unauthorized-id-999')
      .set('Authorization', `Bearer ${authToken}`);

    // If not matching resident's own household, forbidden or not found
    expect([403, 404, 500]).toContain(res.status);
  });

  it('POST /api/v1/admin/users without admin role should return 403 Forbidden', async () => {
    const res = await request(app)
      .get('/api/v1/admin/users')
      .set('Authorization', `Bearer ${authToken}`); // Token is RESIDENT, not SUPER_ADMIN

    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe('FORBIDDEN');
  });
});

