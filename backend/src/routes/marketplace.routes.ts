import { Router } from 'express';
import { marketplaceController } from '../controllers/marketplace.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/rbac.middleware';
import { Role } from '@prisma/client';
import { validateBody } from '../middleware/validate.middleware';
import { createListingSchema, purchaseRequestSchema } from '../validators/marketplace.validator';

const router = Router();

router.get('/listings', marketplaceController.getListings);
router.get('/listings/:id', marketplaceController.getListingById);

router.use(authenticate);

router.post(
  '/listings',
  authorizeRoles(Role.SOCIETY_ADMIN, Role.SUPER_ADMIN),
  validateBody(createListingSchema),
  marketplaceController.createListing
);

router.post(
  '/listings/:id/purchase',
  authorizeRoles(Role.RECYCLER, Role.SUPER_ADMIN),
  validateBody(purchaseRequestSchema),
  marketplaceController.submitPurchaseRequest
);

export default router;

