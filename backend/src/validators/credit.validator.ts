import { z } from 'zod';

export const redeemRewardSchema = z.object({
  rewardId: z.string().min(1, 'Reward ID is required'),
});

export const adjustCreditSchema = z.object({
  householdId: z.string().min(1, 'Household ID is required'),
  amount: z.number().int(),
  reason: z.string().min(3, 'Adjustment reason is required'),
});

