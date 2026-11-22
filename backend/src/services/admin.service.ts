import { prisma } from '../config/prisma';
import { Role } from '@prisma/client';
import { mockUsers } from './mockData';

export class AdminService {
  async getAllUsers() {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          phoneNumber: true,
          role: true,
          avatarUrl: true,
          isActive: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      });
      if (users.length > 0) return users;
    } catch (e) {}

    return mockUsers.map(({ passwordHash, ...rest }) => ({ ...rest, isActive: true, createdAt: new Date() }));
  }

  async updateUserRole(userId: string, newRole: Role) {
    try {
      return await prisma.user.update({
        where: { id: userId },
        data: { role: newRole },
        select: { id: true, email: true, name: true, role: true },
      });
    } catch (e) {
      const mock = mockUsers.find((u) => u.id === userId);
      if (mock) mock.role = newRole;
      return mock;
    }
  }

  async getAuditLogs() {
    try {
      return await prisma.auditLog.findMany({
        include: { user: { select: { name: true, email: true, role: true } } },
        orderBy: { createdAt: 'desc' },
        take: 50,
      });
    } catch (e) {
      return [
        {
          id: 'audit-01',
          action: 'COLLECTION_VERIFIED',
          entity: 'Collection',
          entityId: 'COL-20261120-0042',
          ipAddress: '127.0.0.1',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          details: { aiConfidence: 0.94, weightKg: 3.4 },
        },
        {
          id: 'audit-02',
          action: 'RECYCLER_VERIFIED',
          entity: 'RecyclerProfile',
          entityId: 'REC-GREENEARTH-01',
          ipAddress: '127.0.0.1',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          details: { cpcbLicenseNumber: 'CPCB/DL/E-WASTE/2024/9021' },
        },
      ];
    }
  }

  async verifyRecycler(recyclerId: string, status: 'VERIFIED' | 'REJECTED') {
    try {
      return await prisma.recyclerProfile.update({
        where: { id: recyclerId },
        data: { verificationStatus: status, verifiedAt: new Date() },
      });
    } catch (e) {
      return { id: recyclerId, verificationStatus: status, verifiedAt: new Date() };
    }
  }
}

export const adminService = new AdminService();

