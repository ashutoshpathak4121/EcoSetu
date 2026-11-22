import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/StatCard';
import { marketplaceApi } from '../../services/marketplace.api';
import { Factory, ShoppingBag, FileText, Scale, ArrowRight, ShieldCheck, TrendingUp, CheckCircle2 } from 'lucide-react';

export const RecyclerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await marketplaceApi.getListings();
        setListings(data || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-zinc-900 to-amber-950 border border-amber-500/20 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold border border-amber-400/30">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            CPCB Authorized Recycler (Plastic & Metals)
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            EcoRecycle B2B Exchange: {user?.name || 'Rajesh Gupta'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300">
            Facility License: <strong className="text-amber-400">CPCB/WMT/2024/0912</strong> • Direct Society Aggregator Link • Circular Economy Manifest System
          </p>
        </div>

        <div className="flex-shrink-0">
          <Link
            to="/recycler/marketplace"
            className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Browse Open Waste Lots ({listings.length})
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Open Lots"
          value={listings.length || 3}
          subtitle="Direct from East Delhi RWAs"
          icon={ShoppingBag}
          colorScheme="amber"
        />
        <StatCard
          title="Procured This Month"
          value="18.4 Tons"
          subtitle="Clean segregated recyclables"
          icon={Scale}
          trend={{ value: '+2.8T vs last mo', isPositive: true }}
          colorScheme="green"
        />
        <StatCard
          title="Average Clean Purity"
          value="98.7%"
          subtitle="AI pre-verified at source"
          icon={ShieldCheck}
          colorScheme="blue"
        />
        <StatCard
          title="Verified Manifests"
          value="24 Orders"
          subtitle="100% CPCB compliant"
          icon={FileText}
          colorScheme="purple"
        />
      </div>

      {/* Quick Launchers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/recycler/marketplace"
          className="p-5 rounded-xl bg-white text-gray-900 border border-gray-200 shadow-sm hover:shadow-card-hover transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-amber-50 text-amber-700 rounded-xl group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
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
          to="/recycler/orders"
          className="p-5 rounded-xl bg-white text-gray-900 border border-gray-200 shadow-sm hover:shadow-card-hover transition-all flex items-center justify-between group"
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
