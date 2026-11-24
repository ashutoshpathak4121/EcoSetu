import request from 'supertest';
import { app } from '../app';

describe('Complete EcoSetu Authentication & User Database Test Suite', () => {
  const testUserEmail = `test.resident.${Date.now()}@ecosetu.test`;
  const initialPassword = 'Password@123';
  const newPassword = 'NewSecretPassword@456';
  let authToken = '';
  let resetToken = '';

  // 1. Valid Registration
  it('1. POST /api/v1/auth/register should register a new household resident with durable storage', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      name: 'Priya Sharma',
      email: testUserEmail,
      phoneNumber: '+919876500001',
      password: initialPassword,
      confirmPassword: initialPassword,
      role: 'RESIDENT',
      termsAccepted: true,
      flatNumber: 'C-201',
      wingBlock: 'Block C',
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe(testUserEmail.toLowerCase());
    expect(res.body.data.user.role).toBe('RESIDENT');
    expect(res.body.data.user.passwordHash).toBeUndefined(); // Never leak password hash
    expect(res.body.data.token).toBeDefined();
    authToken = res.body.data.token;
  });

  // 2. Reject Weak Password
  it('2. POST /api/v1/auth/register should reject weak password lacking complexity', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      name: 'Weak Pass User',
      email: `weak.${Date.now()}@ecosetu.test`,
      password: 'weak',
      confirmPassword: 'weak',
      role: 'RESIDENT',
    });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  // 3. Reject Mismatched Password Confirmation
  it('3. POST /api/v1/auth/register should reject mismatched password confirmation', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      name: 'Mismatch User',
      email: `mismatch.${Date.now()}@ecosetu.test`,
      password: initialPassword,
      confirmPassword: 'DifferentPassword@999',
      role: 'RESIDENT',
    });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  // 4. Prevent Duplicate Email Registration
  it('4. POST /api/v1/auth/register should reject duplicate email registration', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      name: 'Duplicate Priya',
      email: testUserEmail,
      password: initialPassword,
      confirmPassword: initialPassword,
      role: 'RESIDENT',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('already exists');
  });

  // 5. Prevent Unauthorized Privileged Role Registration
  it('5. POST /api/v1/auth/register should block unauthorized SUPER_ADMIN registration', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      name: 'Fake Admin',
      email: `fakeadmin.${Date.now()}@ecosetu.test`,
      password: initialPassword,
      role: 'SUPER_ADMIN',
    });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  // 6. Real Login Verification with Permanent Records
  it('6. POST /api/v1/auth/login should authenticate the newly registered user permanently stored in DB', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({
      email: testUserEmail,
      password: initialPassword,
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe(testUserEmail.toLowerCase());
    expect(res.body.data.token).toBeDefined();
    authToken = res.body.data.token;
  });

  // 7. Invalid Password Login Failure
  it('7. POST /api/v1/auth/login should reject incorrect password with 401', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({
      email: testUserEmail,
      password: 'WrongPassword@999',
    });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  // 8. Forgot Password Flow
  it('8. POST /api/v1/auth/forgot-password should generate reset instructions securely', async () => {
    const res = await request(app).post('/api/v1/auth/forgot-password').send({
      email: testUserEmail,
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain('instructions to reset your password');
    expect(res.body.resetToken).toBeDefined();
    resetToken = res.body.resetToken;
  });

  // 9. Reset Password with Token
  it('9. POST /api/v1/auth/reset-password should reset password using valid token', async () => {
    const res = await request(app).post('/api/v1/auth/reset-password').send({
      token: resetToken,
      password: newPassword,
      confirmPassword: newPassword,
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain('Password has been reset successfully');
  });

  // 10. Login with Updated Password and Old Password Failure
  it('10. POST /api/v1/auth/login should allow login with new password and reject old password', async () => {
    // Old password must fail
    const oldRes = await request(app).post('/api/v1/auth/login').send({
      email: testUserEmail,
      password: initialPassword,
    });
    expect(oldRes.status).toBe(401);

    // New password must succeed
    const newRes = await request(app).post('/api/v1/auth/login').send({
      email: testUserEmail,
      password: newPassword,
    });
    expect(newRes.status).toBe(200);
    expect(newRes.body.success).toBe(true);
    authToken = newRes.body.data.token;
  });

  // 11. Retrieve Authenticated Profile
  it('11. GET /api/v1/auth/profile should return current profile with verification and role info', async () => {
    const res = await request(app)
      .get('/api/v1/auth/profile')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe(testUserEmail.toLowerCase());
    expect(res.body.data.role).toBe('RESIDENT');
    expect(res.body.data.passwordHash).toBeUndefined();
  });

  // 12. Update Profile Information
  it('12. PATCH /api/v1/auth/profile should update full name and phone number', async () => {
    const res = await request(app)
      .patch('/api/v1/auth/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Priya Sharma-Verma',
        phoneNumber: '+919876599999',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Priya Sharma-Verma');
    expect(res.body.data.phoneNumber).toBe('+919876599999');
  });

  // 13. Prevent Privilege Escalation via Profile Update
  it('13. PATCH /api/v1/auth/profile should ignore or prevent unauthorized role alteration', async () => {
    const res = await request(app)
      .patch('/api/v1/auth/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        role: 'SUPER_ADMIN',
      });

    // Profile update endpoint strictly ignores or strips role
    expect(res.status).toBe(200);
    expect(res.body.data.role).toBe('RESIDENT');
  });

  // 14. Change Password from Profile
  it('14. POST /api/v1/auth/change-password should change password when current password matches', async () => {
    const changedPassword = 'ThirdSecurePassword@789';
    const res = await request(app)
      .post('/api/v1/auth/change-password')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        currentPassword: newPassword,
        newPassword: changedPassword,
        confirmPassword: changedPassword,
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain('Password updated successfully');
  });

  // 15. RBAC Protection on Admin Management
  it('15. Super Admin management: resident cannot access admin users, admin can', async () => {
    // 15a: Resident gets 403 Forbidden
    const forbiddenRes = await request(app)
      .get('/api/v1/admin/users')
      .set('Authorization', `Bearer ${authToken}`);
    expect(forbiddenRes.status).toBe(403);

    // 15b: Login as Super Admin
    const adminLoginRes = await request(app).post('/api/v1/auth/login').send({
      email: 'admin@ecosetu.in',
      password: 'Password@123',
    });
    expect(adminLoginRes.status).toBe(200);
    const adminToken = adminLoginRes.body.data.token;

    // 15c: Admin gets user list
    const adminUsersRes = await request(app)
      .get('/api/v1/admin/users')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(adminUsersRes.status).toBe(200);
    expect(Array.isArray(adminUsersRes.body.data)).toBe(true);
    expect(adminUsersRes.body.data.some((u: any) => u.email === testUserEmail.toLowerCase())).toBe(true);
  });
});
