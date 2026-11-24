import { prisma, isDbConnected } from '../config/prisma';
import { mockHouseholds, mockSocieties, mockLocalities, mockCreditAccounts } from './mockData';

export class HouseholdService {
  async getHouseholdByUserId(userId: string) {
    if (isDbConnected) {
      try {
        const household = await prisma.household.findFirst({
          where: { userId },
          include: {
            society: true,
            locality: true,
            creditAccount: true,
            collections: {
              orderBy: { createdAt: 'desc' },
              take: 5,
              include: { aiVerification: true },
            },
          },
        });
        if (household) return household;
      } catch (e) {
        // Fallback
      }
    }

    const hh = mockHouseholds.find((h) => h.userId === userId) || mockHouseholds[0];
    const society = mockSocieties.find((s) => s.id === hh.societyId);
    const locality = mockLocalities.find((l) => l.id === hh.localityId);
    const credit = mockCreditAccounts.find((c) => c.householdId === hh.id);

    return {
      ...hh,
      society,
      locality,
      creditAccount: credit,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${hh.qrCodeHash}`,
    };
  }

  async getHouseholdById(id: string, requestingUser?: any) {
    let household: any = null;
    if (isDbConnected) {
      try {
        household = await prisma.household.findUnique({
          where: { id },
          include: { society: true, locality: true, creditAccount: true },
        });
      } catch (e) {
        // Fallback
      }
    }

    if (!household) {
      household = mockHouseholds.find((h) => h.id === id || h.householdId === id);
    }

    if (!household) throw new Error('Household not found.');

    // Security check SEC-02: IDOR protection
    if (requestingUser) {
      if (requestingUser.role === 'RESIDENT' && household.userId !== requestingUser.id) {
        throw new Error('Access denied: You can only view your own household records.');
      }
    }

    return household;
  }

  async getHouseholdsBySociety(societyId: string) {
    try {
      return await prisma.household.findMany({
        where: { societyId },
        include: { user: { select: { name: true, email: true, phoneNumber: true } }, creditAccount: true },
      });
    } catch (e) {
      return mockHouseholds;
    }
  }
}

export const householdService = new HouseholdService();

