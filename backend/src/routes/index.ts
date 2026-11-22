import { Router } from 'express';
import authRoutes from './auth.routes';
import householdRoutes from './household.routes';
import collectionRoutes from './collection.routes';
import collectorRoutes from './collector.routes';
import aiRoutes from './ai.routes';
import creditRoutes from './credit.routes';
import marketplaceRoutes from './marketplace.routes';
import municipalRoutes from './municipal.routes';
import adminRoutes from './admin.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/households', householdRoutes);
router.use('/collections', collectionRoutes);
router.use('/collector', collectorRoutes);
router.use('/ai', aiRoutes);
router.use('/credits', creditRoutes);
router.use('/marketplace', marketplaceRoutes);
router.use('/municipal', municipalRoutes);
router.use('/admin', adminRoutes);

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'HEALTHY',
    service: 'EcoSetu Express REST Gateway',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

export default router;

