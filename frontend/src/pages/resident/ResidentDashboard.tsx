import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { householdApi } from '../../services/household.api';
import { collectionApi } from '../../services/collection.api';
import { StatCard } from '../../components/StatCard';
import { StatusBadge } from '../../components/StatusBadge';
import {
  Coins,
  QrCode,
  CalendarCheck,
  Sparkles,
  Award,
  Truck,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

const DEFAULT_HOUSEHOLD = {
  id: 'hh-dl-wz1-0042',
  householdId: 'HH-DL-WZ1-0042',
  householdIdCode: 'HH-DL-WZ1-0042',
  flatNumber: 'B-402',
  wingBlock: 'Block B',
  society: {
    name: 'Green Meadows Residency',
    locality: { name: 'Mayur Vihar Phase 1' },
  },
  creditAccount: {
    balance: 420,
    tier: 'GREEN_CHAMPION',
    lifetimeCredits: 1250,
  },
  complianceScore: 98.4,
  collectionsCount: 28,
  streakDays: 14,
};

const DEFAULT_COLLECTIONS = [
  {
    id: 'col-101',
    collectionCode: 'COL-2026-0891',
    status: 'VERIFIED',
    createdAt: new Date().toISOString(),
    wetWeightKg: 2.4,
    dryWeightKg: 1.8,
    creditsAwarded: 25,
    purityScore: 96,
  },
  {
    id: 'col-102',
    collectionCode: 'COL-2026-0890',
    status: 'VERIFIED',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    wetWeightKg: 2.1,
    dryWeightKg: 1.5,
    creditsAwarded: 20,
    purityScore: 92,
  },
];

export const ResidentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [household, setHousehold] = useState<any>(DEFAULT_HOUSEHOLD);
  const [collections, setCollections] = useState<any[]>(DEFAULT_COLLECTIONS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hhData = await householdApi.getMyHousehold();
        if (hhData) setHousehold(hhData);
        const colData = await collectionApi.getCollections();
        if (Array.isArray(colData) && colData.length > 0) setCollections(colData);
      } catch (e) {
        console.error('Failed to load resident dashboard data', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-forest-800 to-forest-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
            <Award className="w-3.5 h-3.5" />
            Tier: {household?.creditAccount?.tier?.replace('_', ' ') || 'ECO CHAMPION'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Namaste, {user?.name || 'Pooja Verma'}!
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200 max-w-xl">
            Assigned to <strong>{household?.society?.name || 'Green Meadows Residency'}</strong> • Ward 42 (East Delhi MCD). Keep segregating with your divided bag to earn daily Green Credits!
          </p>
        </div>

        <div className="flex-shrink-0 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-center space-y-2">
          <div className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold">Household ID</div>
          <div className="text-lg font-mono font-black tracking-wider text-white whitespace-nowrap">
            {household?.householdId || 'HH-DL-WZ1-0042'}
          </div>
          <Link
            to="/resident/household"
            className="inline-flex items-center gap-1 text-xs text-emerald-300 hover:text-white font-bold"
          >
            <QrCode className="w-3.5 h-3.5" />
            View Doorstep QR
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Green Credits Balance"
          value={household?.creditAccount?.balance ?? 145}
          subtitle="Redeemable for compost & coupons"
          icon={Coins}
          trend={{ value: '+20 today', isPositive: true }}
          colorScheme="green"
        />
        <StatCard
          title="Compliance Score"
          value={`${household?.complianceScore || 98.4}%`}
          subtitle="Zero contamination record"
          icon={ShieldCheck}
          colorScheme="blue"
        />
        <StatCard
          title="Segregation Streak"
          value="18 Days"
          subtitle="Consecutive verified mornings"
          icon={Award}
          colorScheme="amber"
        />
        <StatCard
          title="Next Scheduled Pickup"
          value="8:30 AM"
          subtitle="Collector: Suresh Kumar (DL-01-GA-4892)"
          icon={Truck}
          colorScheme="purple"
        />
      </div>

      {/* Action Quick Launchers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/resident/ai-verify"
          className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-card-hover transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">AI Waste Scanner</h4>
              <p className="text-xs text-gray-500">Scan segregation before collector arrives</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
        </Link>

        <Link
          to="/resident/request"
          className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-card-hover transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-50 text-blue-700 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Request Collection</h4>
              <p className="text-xs text-gray-500">Schedule custom or bulk pickup</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </Link>

        <Link
          to="/resident/rewards"
          className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-card-hover transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-amber-50 text-amber-700 rounded-xl group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Redeem Rewards</h4>
              <p className="text-xs text-gray-500">Spend credits on compost & rebates</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-amber-600 transition-colors" />
        </Link>
      </div>

      {/* Recent Collections Feed */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-base">Recent Doorstep Collections</h3>
            <span className="text-xs text-gray-500">Verified stream logs and awarded Green Credits</span>
          </div>
          <Link to="/resident/history" className="text-xs font-bold text-emerald-700 hover:underline">
            View All History &rarr;
          </Link>
        </div>

        <div className="divide-y divide-gray-100">
          {collections.length === 0 ? (
            <div className="text-center py-8 text-xs text-gray-500">
              No collection logs found yet. Schedule your first pickup above!
            </div>
          ) : (
            collections.slice(0, 4).map((col) => (
              <div key={col.id} className="py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-gray-900">{col.collectionCode}</span>
                    <StatusBadge status={col.status} size="sm" />
                  </div>
                  <div className="text-gray-500 text-[11px]">
                    {new Date(col.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className="font-bold text-emerald-700 block">+{col.creditsAwarded || 20} Credits</span>
                    <span className="text-[10px] text-gray-400">Purity: 98.2%</span>
                  </div>
                  <Link
                    to="/resident/credits"
                    className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
