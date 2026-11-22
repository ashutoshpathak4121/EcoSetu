import { Router } from 'express';
import { adminController } from '../controllers/admin.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/rbac.middleware';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticate);
router.use(authorizeRoles(Role.SUPER_ADMIN));

router.get('/users', adminController.getUsers);
router.patch('/users/:id/role', adminController.updateUserRole);
router.get('/logs', adminController.getLogs);
router.patch('/recyclers/:id/verify', adminController.verifyRecycler);

export default router;

