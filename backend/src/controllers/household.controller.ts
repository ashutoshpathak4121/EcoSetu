import { Request, Response, NextFunction } from 'express';
import { householdService } from '../services/household.service';

export class HouseholdController {
  async getMyHousehold(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const household = await householdService.getHouseholdByUserId(userId);
      res.status(200).json({
        success: true,
        data: household,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async getHouseholdById(req: Request, res: Response, next: NextFunction) {
    try {
      const household = await householdService.getHouseholdById(req.params.id, req.user);
      res.status(200).json({
        success: true,
        data: household,
      });
    } catch (error: any) {
      if (error.message?.includes('Access denied')) {
        return res.status(403).json({
          success: false,
          message: error.message,
          error: { code: 'FORBIDDEN' },
        });
      }
      next(error);
    }
  }

  async getSocietyHouseholds(req: Request, res: Response, next: NextFunction) {
    try {
      const households = await householdService.getHouseholdsBySociety(req.params.societyId);
      res.status(200).json({
        success: true,
        data: households,
      });
    } catch (error: any) {
      next(error);
    }
  }
}

export const householdController = new HouseholdController();

