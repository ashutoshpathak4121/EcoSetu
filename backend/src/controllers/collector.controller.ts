import { Request, Response, NextFunction } from 'express';
import { collectionService } from '../services/collection.service';
import { CollectionStatus } from '@prisma/client';

export class CollectorController {
  async getTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const collections = await collectionService.getCollections({
        status: CollectionStatus.ASSIGNED,
      });
      res.status(200).json({
        success: true,
        data: collections,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async submitEvidence(req: Request, res: Response, next: NextFunction) {
    try {
      const collectionId = req.params.id;
      const {
        latitude,
        longitude,
        wetWeightKg,
        dryWeightKg,
        sanitaryWeightKg,
        specialCareWeightKg,
        imageBase64,
        notes,
      } = req.body;

      const result = await collectionService.submitEvidenceAndVerify(collectionId, {
        latitude: latitude ? parseFloat(latitude) : undefined,
        longitude: longitude ? parseFloat(longitude) : undefined,
        wetWeightKg: wetWeightKg ? parseFloat(wetWeightKg) : 0,
        dryWeightKg: dryWeightKg ? parseFloat(dryWeightKg) : 0,
        sanitaryWeightKg: sanitaryWeightKg ? parseFloat(sanitaryWeightKg) : 0,
        specialCareWeightKg: specialCareWeightKg ? parseFloat(specialCareWeightKg) : 0,
        imageBase64,
        notes,
      });

      res.status(200).json({
        success: true,
        message: 'Evidence submitted and analyzed by AI verification engine.',
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { status } = req.body;
      const updated = await collectionService.updateStatus(req.params.id, status);
      res.status(200).json({
        success: true,
        data: updated,
      });
    } catch (error: any) {
      next(error);
    }
  }
}

export const collectorController = new CollectorController();

