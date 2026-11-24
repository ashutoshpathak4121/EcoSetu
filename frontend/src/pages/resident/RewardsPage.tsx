import React, { useEffect, useState } from 'react';
import { creditsApi } from '../../services/credits.api';
import { Coins, Gift, CheckCircle2, AlertCircle, Tag, Copy, Sparkles } from 'lucide-react';

export const RewardsPage: React.FC = () => {
  const [balance, setBalance] = useState<number>(145);
  const [rewards, setRewards] = useState<any[]>([]);
  const [redeemedCode, setRedeemedCode] = useState<string | null>(null);
  const [selectedReward, setSelectedReward] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const balData = await creditsApi.getBalance();
        setBalance(balData?.balance ?? 145);
        const rewData = await creditsApi.getRewards();
        setRewards(rewData);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const handleRedeem = async (reward: any) => {
    if (balance < reward.creditCost) {
      setError(`Insufficient credits. You need ${reward.creditCost} credits, but currently have ${balance}.`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await creditsApi.redeemReward(reward.id);
      const code = res?.redemptionCode || res?.data?.redemptionCode || `ECO-RBD-${Math.floor(1000 + Math.random() * 9000)}`;
      setRedeemedCode(code);
      setSelectedReward(reward);
      setBalance((prev) => prev - reward.creditCost);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Redemption failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Eco-Rewards Marketplace</h1>
          <p className="text-xs text-gray-500">Redeem your verified segregation credits for civic benefits and sustainable products</p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-2xl flex items-center space-x-2">
          <Coins className="w-5 h-5 text-emerald-700" />
          <div>
            <div className="text-[10px] text-gray-500 font-bold uppercase">Available Credits</div>
            <div className="text-lg font-black text-emerald-900 leading-tight">{balance} Credits</div>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Redemption Success Modal */}
      {redeemedCode && selectedReward && (
        <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-500 rounded-2xl shadow-md space-y-3">
          <div className="flex items-center space-x-2 text-emerald-900">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h3 className="font-extrabold text-base">Voucher Redeemed Successfully!</h3>
          </div>
          <p className="text-xs text-gray-700">
            You successfully redeemed <strong>{selectedReward.title}</strong> for {selectedReward.creditCost} credits.
          </p>
          <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-emerald-300 w-fit">
            <span className="font-mono font-extrabold text-lg text-emerald-900 tracking-wider">
              {redeemedCode}
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(redeemedCode)}
              className="p-1.5 hover:bg-gray-100 rounded text-gray-500"
              title="Copy Coupon Code"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[11px] text-gray-500">
            Show this digital code to your society RWA gate office, nearest MCD nursery, or enter during online property tax assessment.
          </p>
        </div>
      )}

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-card-hover transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-44 w-full overflow-hidden bg-gray-100 relative">
                <img
                  src={reward.imageUrl || 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500'}
                  alt={reward.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-forest-900/90 text-white text-xs font-bold backdrop-blur-sm">
                  {reward.creditCost} Credits
                </span>
                <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-white/90 text-gray-800 text-[10px] font-bold backdrop-blur-sm">
                  Partner: {reward.partnerName}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-bold text-gray-900 text-base">{reward.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{reward.description}</p>
                <div className="text-[11px] text-gray-400 pt-1">{reward.terms}</div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => handleRedeem(reward)}
                disabled={loading || balance < reward.creditCost}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                  balance >= reward.creditCost
                    ? 'bg-forest-800 hover:bg-forest-700 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Gift className="w-4 h-4" />
                {balance >= reward.creditCost ? `Redeem for ${reward.creditCost} Credits` : 'Insufficient Credits'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

