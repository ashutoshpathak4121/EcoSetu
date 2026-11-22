import { Router } from 'express';
import { householdController } from '../controllers/household.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/me', householdController.getMyHousehold);
router.get('/:id', householdController.getHouseholdById);
router.get('/society/:societyId', householdController.getSocietyHouseholds);

export default router;

