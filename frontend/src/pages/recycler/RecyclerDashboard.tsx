import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/StatCard';
import { Scale, FileText, ShieldCheck, ArrowRight, TrendingUp } from 'lucide-react';

export const RecyclerDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-900 to-forest-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-400/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            CPCB Authorized Recycler • Lic: CPCB/DL/E-WASTE/2024/9021
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Procurement Console: {user?.name || 'GreenEarth Recyclers India Pvt Ltd'}
          </h1>
          <p className="text-xs sm:text-sm text-amber-200">
            Source-segregated commercial polymer, cardboard, and domestic hazardous feedstock directly from verified RWAs.
          </p>
        </div>

        <div className="flex-shrink-0">
          <Link
            to="/dashboard/recycler/marketplace"
            className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <Scale className="w-4 h-4" />
            Browse Available Lots
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Procured This Month"
          value="4.2 MT"
          subtitle="Direct from society balers"
          icon={Scale}
          trend={{ value: '+18% vs last month', isPositive: true }}
          colorScheme="amber"
        />
        <StatCard
          title="Average Purity"
          value="98.2%"
          subtitle="AI verified source segregation"
          icon={ShieldCheck}
          colorScheme="green"
        />
        <StatCard
          title="Active Orders"
          value="2 Lots"
          subtitle="In-transit & weighbridge verified"
          icon={FileText}
          colorScheme="blue"
        />
        <StatCard
          title="Procurement Spend"
          value="₹1.42 Lakh"
          subtitle="Escrow-protected settlement"
          icon={TrendingUp}
          colorScheme="purple"
        />
      </div>

      {/* Quick Launchers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/dashboard/recycler/marketplace"
          className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-card-hover transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-amber-50 text-amber-700 rounded-xl group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Browse Available Recyclable Lots</h4>
              <p className="text-xs text-gray-500">Filter by material purity, society location, and place purchase bids</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-amber-600" />
        </Link>

        <Link
          to="/dashboard/recycler/orders"
          className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-card-hover transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-50 text-blue-700 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Purchase Orders & Manifests</h4>
              <p className="text-xs text-gray-500">Weighbridge verification slips and digital waste transport manifests</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
        </Link>
      </div>
    </div>
  );
};

