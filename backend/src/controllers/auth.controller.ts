import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.register(req.body);
      res.status(201).json({
        success: true,
        message: 'Registration successful.',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Registration failed.',
        error: { code: 'REGISTRATION_ERROR' },
      });
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.login(req.body);
      res.status(200).json({
        success: true,
        message: 'Authentication successful.',
        data: result,
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message || 'Invalid credentials.',
        error: { code: 'AUTH_FAILED' },
      });
    }
  }

  async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const user = await authService.getCurrentUser(userId);
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const user = await authService.getCurrentUser(userId);
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const updated = await authService.updateProfile(userId, req.body);
      res.status(200).json({
        success: true,
        message: 'Profile updated successfully.',
        data: updated,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to update profile.',
        error: { code: 'PROFILE_UPDATE_FAILED' },
      });
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const { currentPassword, newPassword } = req.body;
      const result = await authService.changePassword(userId, currentPassword, newPassword);
      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to change password.',
        error: { code: 'CHANGE_PASSWORD_FAILED' },
      });
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.forgotPassword(req.body.email);
      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error: any) {
      // Always return a benign response even on error to prevent account enumeration
      res.status(200).json({
        success: true,
        message: 'If that email address is in our system, we have sent instructions to reset your password.',
      });
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, password } = req.body;
      const result = await authService.resetPassword(token, password);
      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Password reset failed.',
        error: { code: 'RESET_PASSWORD_FAILED' },
      });
    }
  }

  async logout(req: Request, res: Response) {
    res.status(200).json({
      success: true,
      message: 'Logged out successfully.',
    });
  }
}

export const authController = new AuthController();
