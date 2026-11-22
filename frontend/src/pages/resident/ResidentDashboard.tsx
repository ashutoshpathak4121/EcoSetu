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

export const ResidentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [household, setHousehold] = useState<any>(null);
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hhData = await householdApi.getMyHousehold();
        setHousehold(hhData);
        const colData = await collectionApi.getCollections();
        setCollections(colData);
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
            Namaste, {user?.name || 'Aarav Sharma'}!
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200 max-w-xl">
            Assigned to <strong>{household?.society?.name || 'Gulmohar Enclave RWA'}</strong> • Ward 203 (East Delhi MCD). Keep segregating with your divided bag to earn daily Green Credits!
          </p>
        </div>

        <div className="flex-shrink-0 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-center space-y-2">
          <div className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold">Household ID</div>
          <div className="text-lg font-mono font-black tracking-wider text-white">
            {household?.householdId || 'HH-DL-WZ1-0042'}
          </div>
          <Link
            to="/dashboard/resident/household"
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
          subtitle="Collector: Rajesh Kumar"
          icon={Truck}
          colorScheme="purple"
        />
      </div>

      {/* Action Quick Launchers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/dashboard/resident/ai-verify"
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
          to="/dashboard/resident/request"
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
          to="/dashboard/resident/rewards"
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
          <h3 className="font-bold text-gray-900 text-base">Recent Doorstep Collections</h3>
          <Link
            to="/dashboard/resident/history"
            className="text-xs font-semibold text-emerald-700 hover:underline"
          >
            View All History &rarr;
          </Link>
        </div>

        <div className="divide-y divide-gray-100">
          {collections.slice(0, 3).map((col) => (
            <div key={col.id} className="py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="font-mono font-bold text-gray-900">{col.collectionCode}</div>
                <div className="text-gray-500">{col.addressSnapshot || 'Flat B-402, Gulmohar Enclave'}</div>
                <div className="text-[11px] text-gray-400">
                  Total Weight: <strong>{col.totalWeightKg || 3.4} kg</strong> (Wet: {col.wetWeightKg || 2.1}kg, Dry: {col.dryWeightKg || 1.1}kg)
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {col.aiVerification && (
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    AI Purity: {Math.round(col.aiVerification.confidence * 100)}%
                  </span>
                )}
                <StatusBadge status={col.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

