import { Router } from 'express';
import { collectorController } from '../controllers/collector.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/rbac.middleware';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticate);
router.use(authorizeRoles(Role.COLLECTOR, Role.MCD_OFFICER, Role.SUPER_ADMIN));

router.get('/tasks', collectorController.getTasks);
router.post('/collections/:id/evidence', collectorController.submitEvidence);
router.patch('/collections/:id/status', collectorController.updateStatus);

export default router;

