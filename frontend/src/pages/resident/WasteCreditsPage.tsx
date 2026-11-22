import React, { useEffect, useState } from 'react';
import { creditsApi } from '../../services/credits.api';
import { Coins, Award, TrendingUp, ArrowDownRight, ArrowUpRight, ShieldCheck, Info } from 'lucide-react';
import { StatCard } from '../../components/StatCard';

export const WasteCreditsPage: React.FC = () => {
  const [account, setAccount] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const acc = await creditsApi.getBalance();
        setAccount(acc);
        const txs = await creditsApi.getTransactions();
        setTransactions(txs || acc?.transactions || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCredits();
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">WasteChakra Green Credits Wallet</h1>
        <p className="text-xs text-gray-500">
          Cryptographically recorded double-entry ledger • Powered by verified doorstep source segregation
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Current Credit Balance"
          value={account?.balance ?? 145}
          subtitle="1 Credit ≈ ₹1 Civic Utility Value"
          icon={Coins}
          colorScheme="green"
        />
        <StatCard
          title="Lifetime Credits Earned"
          value={account?.totalEarned ?? 220}
          subtitle="Cumulative segregation rewards"
          icon={TrendingUp}
          colorScheme="blue"
        />
        <StatCard
          title="Total Redeemed"
          value={account?.totalRedeemed ?? 75}
          subtitle="Spent on compost & rebates"
          icon={Award}
          colorScheme="amber"
        />
      </div>

      {/* Credit Rules Explainer */}
      <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5 space-y-3 text-xs text-forest-900">
        <h3 className="font-bold text-sm text-forest-800 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-emerald-600" />
          How Green Credits are Earned
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white p-3 rounded-xl border border-emerald-200/80">
            <span className="font-bold text-emerald-800 block">+20 Credits / Collection</span>
            <span className="text-gray-600 text-[11px] mt-0.5 block">
              Awarded when wet and dry streams are segregated in the divided bag and verified by AI.
            </span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-emerald-200/80">
            <span className="font-bold text-blue-800 block">+10 Credits Purity Bonus</span>
            <span className="text-gray-600 text-[11px] mt-0.5 block">
              Awarded when AI computer vision scores 95%+ purity with 0% cross-contamination.
            </span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-emerald-200/80">
            <span className="font-bold text-amber-800 block">+50 Weekly Streak Bonus</span>
            <span className="text-gray-600 text-[11px] mt-0.5 block">
              Given to households maintaining 7 consecutive days of verified morning collections.
            </span>
          </div>
        </div>
      </div>

      {/* Transaction Ledger Table */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-base">Immutable Ledger Transactions</h3>
          <span className="text-xs text-gray-500 font-mono">Double-Entry Ledger</span>
        </div>

        <div className="divide-y divide-gray-100 overflow-x-auto">
          {transactions.map((tx) => {
            const isCredit = tx.amount > 0;
            return (
              <div key={tx.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-xl flex-shrink-0 ${
                      isCredit ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {isCredit ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block">{tx.description}</span>
                    <span className="text-[11px] text-gray-400 font-mono">
                      Ref: {tx.idempotencyKey || tx.id} • {new Date(tx.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`font-extrabold text-sm block ${
                      isCredit ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {isCredit ? `+${tx.amount}` : tx.amount} Credits
                  </span>
                  <span className="text-[11px] text-gray-400 block font-mono">
                    Balance: {tx.balanceAfter}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

