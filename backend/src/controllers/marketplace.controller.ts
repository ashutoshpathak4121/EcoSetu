import { Request, Response, NextFunction } from 'express';
import { marketplaceService } from '../services/marketplace.service';
import { ListingStatus, PurityGrade, WasteStreamType } from '@prisma/client';

export class MarketplaceController {
  async getListings(req: Request, res: Response, next: NextFunction) {
    try {
      const { category, purityGrade, status } = req.query;
      const listings = await marketplaceService.getListings({
        category: category as WasteStreamType,
        purityGrade: purityGrade as PurityGrade,
        status: status as ListingStatus,
      });
      res.status(200).json({
        success: true,
        data: listings,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async getListingById(req: Request, res: Response, next: NextFunction) {
    try {
      const listing = await marketplaceService.getListingById(req.params.id);
      res.status(200).json({
        success: true,
        data: listing,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async createListing(req: Request, res: Response, next: NextFunction) {
    try {
      const societyId = req.body.societyId || 'soc-gulmohar-01';
      const listing = await marketplaceService.createListing(societyId, req.body);
      res.status(201).json({
        success: true,
        message: 'Waste lot listed on marketplace successfully.',
        data: listing,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async submitPurchaseRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const request = await marketplaceService.submitPurchaseRequest(req.params.id, userId, req.body);
      res.status(201).json({
        success: true,
        message: 'Purchase request submitted to society.',
        data: request,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Purchase request submission failed.',
        error: { code: 'PURCHASE_REQUEST_ERROR' },
      });
    }
  }
}

export const marketplaceController = new MarketplaceController();

