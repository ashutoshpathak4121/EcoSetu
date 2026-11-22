import { Request, Response, NextFunction } from 'express';
import { collectionService } from '../services/collection.service';
import { CollectionStatus } from '@prisma/client';

export class CollectionController {
  async createCollection(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const result = await collectionService.createCollection(userId, req.body);
      res.status(201).json({
        success: true,
        message: 'Collection pickup requested successfully.',
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async getCollections(req: Request, res: Response, next: NextFunction) {
    try {
      const { householdId, collectorId, status, localityId } = req.query;
      const collections = await collectionService.getCollections({
        householdId: householdId as string,
        collectorId: collectorId as string,
        status: status as CollectionStatus,
        localityId: localityId as string,
      });
      res.status(200).json({
        success: true,
        data: collections,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async getCollectionById(req: Request, res: Response, next: NextFunction) {
    try {
      const collection = await collectionService.getCollectionById(req.params.id);
      res.status(200).json({
        success: true,
        data: collection,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, rejectionReason } = req.body;
      const updated = await collectionService.updateStatus(req.params.id, status, rejectionReason);
      res.status(200).json({
        success: true,
        message: `Collection status updated to ${status}.`,
        data: updated,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async getHouseholdHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const history = await collectionService.getCollections({ householdId: req.params.householdId });
      res.status(200).json({
        success: true,
        data: history,
      });
    } catch (error: any) {
      next(error);
    }
  }
}

export const collectionController = new CollectionController();

