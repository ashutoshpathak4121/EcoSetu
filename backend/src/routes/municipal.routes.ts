import { Router } from 'express';
import { municipalController } from '../controllers/municipal.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/rbac.middleware';
import { Role } from '@prisma/client';

const router = Router();

// Public / Demo overview endpoint accessible for judging demo or authenticated MCD officers
router.get('/overview', municipalController.getOverview);
router.get('/analytics', municipalController.getLocalityAnalytics);
router.get('/vehicles', municipalController.getVehicles);

router.use(authenticate);
router.use(authorizeRoles(Role.MCD_OFFICER, Role.SUPER_ADMIN));

router.get('/flagged-reviews', municipalController.getFlaggedReviews);

export default router;

