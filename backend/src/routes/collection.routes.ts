import { Router } from 'express';
import { collectionController } from '../controllers/collection.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { createCollectionSchema, updateCollectionStatusSchema } from '../validators/collection.validator';

const router = Router();

router.use(authenticate);

router.post('/', validateBody(createCollectionSchema), collectionController.createCollection);
router.get('/', collectionController.getCollections);
router.get('/:id', collectionController.getCollectionById);
router.patch('/:id/status', validateBody(updateCollectionStatusSchema), collectionController.updateStatus);
router.get('/household/:householdId', collectionController.getHouseholdHistory);

export default router;

