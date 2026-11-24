import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema,
  changePasswordSchema,
} from '../validators/auth.validator';
import rateLimit from 'express-rate-limit';

const router = Router();

// Dedicated rate limiting for authentication attempts to prevent brute force
const authAttemptLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30, // 30 attempts per 15 minutes per IP
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again after 15 minutes.',
    error: { code: 'AUTH_RATE_LIMIT_EXCEEDED' },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/register', authAttemptLimiter, validateBody(registerSchema), authController.register);
router.post('/login', authAttemptLimiter, validateBody(loginSchema), authController.login);
router.get('/me', authenticate, authController.getCurrentUser);
router.get('/profile', authenticate, authController.getProfile);
router.patch('/profile', authenticate, validateBody(updateProfileSchema), authController.updateProfile);
router.post('/change-password', authenticate, validateBody(changePasswordSchema), authController.changePassword);
router.post('/forgot-password', authAttemptLimiter, validateBody(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', authAttemptLimiter, validateBody(resetPasswordSchema), authController.resetPassword);
router.post('/logout', authController.logout);

export default router;
