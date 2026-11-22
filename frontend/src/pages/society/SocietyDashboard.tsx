import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/StatCard';
import { Building2, Users, ShoppingBag, Award, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';

export const SocietyDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-900 to-forest-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-400/30">
            <Building2 className="w-3.5 h-3.5" />
            Gulmohar Enclave RWA • Reg: RWA/EAST/2018/892
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Society RWA Console: {user?.name || 'Sunita Mehra'}
          </h1>
          <p className="text-xs sm:text-sm text-purple-200">
            Monitoring 160 residential flats in Mayur Vihar Phase 1 (Ward 203). High-purity recyclable aggregation and composting facility.
          </p>
        </div>

        <div className="flex-shrink-0">
          <Link
            to="/dashboard/society/marketplace"
            className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            List Recyclables on Market
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Segregation Compliance"
          value="98.4%"
          subtitle="Top ranked RWA in East Delhi"
          icon={Award}
          trend={{ value: '+2.1% this week', isPositive: true }}
          colorScheme="green"
        />
        <StatCard
          title="Registered Flats"
          value="160 / 160"
          subtitle="100% onboarded to SwachhSetu"
          icon={Users}
          colorScheme="blue"
        />
        <StatCard
          title="Marketplace Revenue"
          value="₹42,850"
          subtitle="Earned from selling baled PET/Cardboard"
          icon={TrendingUp}
          colorScheme="amber"
        />
        <StatCard
          title="Society Compost Yield"
          value="1,200 kg"
          subtitle="Bio-methanation pit active"
          icon={CheckCircle2}
          colorScheme="purple"
        />
      </div>

      {/* Quick Launchers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/dashboard/society/households"
          className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-card-hover transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-50 text-purple-700 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Resident Household Directory</h4>
              <p className="text-xs text-gray-500">View compliance scores, flat QR badges, and onboarding</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
        </Link>

        <Link
          to="/dashboard/society/marketplace"
          className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-card-hover transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">B2B Recycler Marketplace Lots</h4>
              <p className="text-xs text-gray-500">Create bulk listings and review recycler purchase bids</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600" />
        </Link>
      </div>
    </div>
  );
};

