import { Router } from 'express';
import { creditController } from '../controllers/credit.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { redeemRewardSchema } from '../validators/credit.validator';

const router = Router();

router.get('/rewards', creditController.getRewards);

router.use(authenticate);

router.get('/balance', creditController.getBalance);
router.get('/transactions', creditController.getTransactions);
router.post('/redeem', validateBody(redeemRewardSchema), creditController.redeemReward);

export default router;

