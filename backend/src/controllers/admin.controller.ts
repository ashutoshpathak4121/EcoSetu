import { Request, Response, NextFunction } from 'express';
import { adminService } from '../services/admin.service';

export class AdminController {
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await adminService.getAllUsers();
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async updateUserRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { role } = req.body;
      const updated = await adminService.updateUserRole(req.params.id, role);
      res.status(200).json({
        success: true,
        message: `User role updated to ${role}.`,
        data: updated,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async getLogs(req: Request, res: Response, next: NextFunction) {
    try {
      const logs = await adminService.getAuditLogs();
      res.status(200).json({
        success: true,
        data: logs,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async verifyRecycler(req: Request, res: Response, next: NextFunction) {
    try {
      const { status } = req.body;
      const verified = await adminService.verifyRecycler(req.params.id, status || 'VERIFIED');
      res.status(200).json({
        success: true,
        message: `Recycler registration status updated to ${status}.`,
        data: verified,
      });
    } catch (error: any) {
      next(error);
    }
  }
}

export const adminController = new AdminController();

