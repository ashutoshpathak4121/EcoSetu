import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/StatCard';
import { Building2, Users, ShoppingBag, Award, ArrowRight, ShieldCheck, Scale } from 'lucide-react';

export const SocietyDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30">
            <Award className="w-3.5 h-3.5" />
            Registered RWA • Clean Society Award Holder
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Green Meadows Residency RWA
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200">
            Administrator: <strong>{user?.name || 'Anil Mehta (RWA President)'}</strong> • 140 Residential Units Connected • Mayur Vihar Phase 1 (Ward 42)
          </p>
        </div>

        <div className="flex-shrink-0">
          <Link
            to="/society/marketplace"
            className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Publish Recyclable Waste Lot
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Segregation Rate"
          value="91.4%"
          subtitle="Target: 95% zero-landfill"
          icon={ShieldCheck}
          trend={{ value: '+4.2% this month', isPositive: true }}
          colorScheme="green"
        />
        <StatCard
          title="Active Flats"
          value="134 / 140"
          subtitle="Using 4-stream divided bags"
          icon={Users}
          colorScheme="blue"
        />
        <StatCard
          title="Monthly Recycled"
          value="3,840 kg"
          subtitle="Baled PET, Paper & Metal"
          icon={Scale}
          colorScheme="purple"
        />
        <StatCard
          title="RWA Green Revenue"
          value="₹46,200"
          subtitle="Earned from verified recyclers"
          icon={Award}
          trend={{ value: '₹12.50/kg avg rate', isPositive: true }}
          colorScheme="amber"
        />
      </div>

      {/* Quick Launchers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/society/households"
          className="p-5 rounded-xl bg-white text-gray-900 border border-gray-200 shadow-sm hover:shadow-card-hover transition-all flex items-center justify-between group"
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
          to="/society/marketplace"
          className="p-5 rounded-xl bg-white text-gray-900 border border-gray-200 shadow-sm hover:shadow-card-hover transition-all flex items-center justify-between group"
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
