import { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';

export function authorizeRoles(...allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required prior to authorization.',
        error: { code: 'UNAUTHORIZED' },
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Role '${req.user.role}' is not authorized for this action.`,
        error: {
          code: 'FORBIDDEN',
          details: { requiredRoles: allowedRoles, currentRole: req.user.role },
        },
      });
    }

    next();
  };
}

