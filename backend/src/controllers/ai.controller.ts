import { Request, Response, NextFunction } from 'express';
import { aiClient } from '../integrations/ai.client';

export class AIController {
  async verifyWaste(req: Request, res: Response, next: NextFunction) {
    try {
      const { imageBase64, declaredCategory } = req.body;
      const result = await aiClient.verifyWaste({
        imageBase64,
        declaredCategory,
      });

      res.status(200).json(result);
    } catch (error: any) {
      next(error);
    }
  }
}

export const aiController = new AIController();

