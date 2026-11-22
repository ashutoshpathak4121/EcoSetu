import { api } from './api';

export const creditsApi = {
  getBalance: async () => {
    const res = await api.get('/credits/balance');
    return res.data.data;
  },

  getTransactions: async () => {
    const res = await api.get('/credits/transactions');
    return res.data.data;
  },

  getRewards: async () => {
    const res = await api.get('/credits/rewards');
    return res.data.data;
  },

  redeemReward: async (rewardId: string) => {
    const res = await api.post('/credits/redeem', { rewardId });
    return res.data.data;
  },
};

