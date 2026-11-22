import { Request, Response, NextFunction } from 'express';
import { municipalService } from '../services/municipal.service';

export class MunicipalController {
  async getOverview(req: Request, res: Response, next: NextFunction) {
    try {
      const overview = await municipalService.getOverview();
      res.status(200).json({
        success: true,
        data: overview,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async getLocalityAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      const analytics = await municipalService.getLocalityAnalytics();
      res.status(200).json({
        success: true,
        data: analytics,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async getVehicles(req: Request, res: Response, next: NextFunction) {
    try {
      const vehicles = await municipalService.getVehicles();
      res.status(200).json({
        success: true,
        data: vehicles,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async getFlaggedReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const reviews = await municipalService.getFlaggedReviews();
      res.status(200).json({
        success: true,
        data: reviews,
      });
    } catch (error: any) {
      next(error);
    }
  }
}

export const municipalController = new MunicipalController();

