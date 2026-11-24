import { prisma, isDbConnected } from '../config/prisma';
import { CreditTransactionType } from '@prisma/client';
import { mockCreditAccounts, mockCreditTransactions, mockRewards } from './mockData';

export class CreditService {
  async getAccount(householdId: string) {
    if (isDbConnected) {
      try {
        const account = await prisma.creditAccount.findUnique({
          where: { householdId },
          include: {
            transactions: {
              orderBy: { createdAt: 'desc' },
              take: 20,
            },
          },
        });
        if (account) return account;
      } catch (e) {}
    }

    const mockAcc = mockCreditAccounts.find((a) => a.householdId === householdId) || mockCreditAccounts[0];
    return {
      ...mockAcc,
      transactions: mockCreditTransactions.filter((t) => t.accountId === mockAcc.id),
    };
  }

  async awardSegregationCredits(
    householdId: string,
    amount: number,
    referenceId: string,
    description: string
  ) {
    const idempotencyKey = `EARN-${referenceId}-${amount}`;

    try {
      // Execute in PostgreSQL atomic transaction
      return await prisma.$transaction(async (tx) => {
        // Idempotency check: if already awarded, return existing
        const existingTx = await tx.creditTransaction.findUnique({
          where: { idempotencyKey },
        });
        if (existingTx) return existingTx;

        const account = await tx.creditAccount.upsert({
          where: { householdId },
          create: { householdId, balance: amount, totalEarned: amount },
          update: {
            balance: { increment: amount },
            totalEarned: { increment: amount },
          },
        });

        // Determine tier
        let tier = 'GREEN_CITIZEN';
        if (account.totalEarned >= 500) tier = 'PLANET_HERO';
        else if (account.totalEarned >= 150) tier = 'ECO_CHAMPION';

        if (account.tier !== tier) {
          await tx.creditAccount.update({
            where: { id: account.id },
            data: { tier },
          });
        }

        return await tx.creditTransaction.create({
          data: {
            accountId: account.id,
            amount,
            transactionType: CreditTransactionType.EARN_SEGREGATION,
            idempotencyKey,
            referenceId,
            description,
            balanceAfter: account.balance,
          },
        });
      });
    } catch (e) {
      // Mock store fallback
      const mockAcc = mockCreditAccounts[0];
      mockAcc.balance += amount;
      mockAcc.totalEarned += amount;
      const newTx = {
        id: `tx-${Date.now()}`,
        accountId: mockAcc.id,
        amount,
        transactionType: CreditTransactionType.EARN_SEGREGATION,
        idempotencyKey,
        description,
        balanceAfter: mockAcc.balance,
        createdAt: new Date().toISOString(),
      };
      mockCreditTransactions.unshift(newTx as any);
      return newTx;
    }
  }

  async getRewards() {
    if (isDbConnected) {
      try {
        const rewards = await prisma.reward.findMany({ where: { active: true } });
        if (rewards.length > 0) return rewards;
      } catch (e) {}
    }

    return mockRewards;
  }

  async redeemReward(householdId: string, rewardId: string) {
    const redemptionCode = `SWACHH-RBD-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      return await prisma.$transaction(async (tx) => {
        const reward = await tx.reward.findUnique({ where: { id: rewardId } });
        if (!reward) throw new Error('Reward item not found.');

        const account = await tx.creditAccount.findUnique({ where: { householdId } });
        if (!account || account.balance < reward.creditCost) {
          throw new Error(`Insufficient credits. Required: ${reward.creditCost}, Available: ${account?.balance || 0}`);
        }

        // Deduct balance atomically
        const updatedAccount = await tx.creditAccount.update({
          where: { id: account.id },
          data: {
            balance: { decrement: reward.creditCost },
            totalRedeemed: { increment: reward.creditCost },
          },
        });

        const redemption = await tx.rewardRedemption.create({
          data: {
            householdId,
            rewardId,
            creditsSpent: reward.creditCost,
            redemptionCode,
            status: 'PENDING',
            expiresAt: new Date(Date.now() + 30 * 86400000), // 30 days validity
          },
          include: { reward: true },
        });

        await tx.creditTransaction.create({
          data: {
            accountId: account.id,
            amount: -reward.creditCost,
            transactionType: CreditTransactionType.REDEEM_REWARD,
            idempotencyKey: `REDEEM-${redemption.id}`,
            referenceId: redemption.id,
            description: `Redeemed: ${reward.title}`,
            balanceAfter: updatedAccount.balance,
          },
        });

        return redemption;
      });
    } catch (e: any) {
      if (e.message.includes('Insufficient credits')) throw e;

      // Mock store redemption
      const mockAcc = mockCreditAccounts[0];
      const reward = mockRewards.find((r) => r.id === rewardId) || mockRewards[0];

      if (mockAcc.balance < reward.creditCost) {
        throw new Error(`Insufficient credits. Required: ${reward.creditCost}, Available: ${mockAcc.balance}`);
      }

      mockAcc.balance -= reward.creditCost;
      mockAcc.totalRedeemed += reward.creditCost;

      const mockRedemption = {
        id: `red-${Date.now()}`,
        householdId,
        rewardId,
        reward,
        creditsSpent: reward.creditCost,
        redemptionCode,
        status: 'PENDING',
        expiresAt: new Date(Date.now() + 30 * 86400000).toISOString(),
      };

      mockCreditTransactions.unshift({
        id: `tx-red-${Date.now()}`,
        accountId: mockAcc.id,
        amount: -reward.creditCost,
        transactionType: CreditTransactionType.REDEEM_REWARD,
        idempotencyKey: `REDEEM-${mockRedemption.id}`,
        description: `Redeemed: ${reward.title}`,
        balanceAfter: mockAcc.balance,
        createdAt: new Date().toISOString(),
      } as any);

      return mockRedemption;
    }
  }
}

export const creditService = new CreditService();

