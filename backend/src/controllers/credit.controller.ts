import { Request, Response, NextFunction } from 'express';
import { creditService } from '../services/credit.service';
import { householdService } from '../services/household.service';

export class CreditController {
  async getBalance(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const hh = await householdService.getHouseholdByUserId(userId);
      const account = await creditService.getAccount(hh.id);
      res.status(200).json({
        success: true,
        data: account,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async getTransactions(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const hh = await householdService.getHouseholdByUserId(userId);
      const account = await creditService.getAccount(hh.id);
      res.status(200).json({
        success: true,
        data: account.transactions,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async getRewards(req: Request, res: Response, next: NextFunction) {
    try {
      const rewards = await creditService.getRewards();
      res.status(200).json({
        success: true,
        data: rewards,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async redeemReward(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const { rewardId } = req.body;
      const hh = await householdService.getHouseholdByUserId(userId);
      const result = await creditService.redeemReward(hh.id, rewardId);

      res.status(200).json({
        success: true,
        message: 'Reward redeemed successfully.',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Reward redemption failed.',
        error: { code: 'REDEMPTION_FAILED' },
      });
    }
  }
}

export const creditController = new CreditController();

