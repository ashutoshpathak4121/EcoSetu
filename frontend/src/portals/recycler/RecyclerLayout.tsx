import React from 'react';
import { Outlet, Navigate, NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../../../shared/types';
import { DemoRoleSwitcher } from '../../components/DemoRoleSwitcher';
import {
  Factory,
  ShoppingBag,
  FileText,
  BadgeCheck,
  TrendingUp,
  LogOut,
  ShieldAlert,
  Boxes
} from 'lucide-react';

export const RecyclerLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout, switchDemoRole } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      switchDemoRole(UserRole.RECYCLER);
    }
  }, [isLoading, isAuthenticated, switchDemoRole]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="text-xs font-mono text-zinc-400">Loading B2B Recycler Exchange...</div>
        </div>
      </div>
    );
  }

  if (user?.role !== UserRole.RECYCLER) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-16 h-16 bg-amber-500/10 border-2 border-amber-500 rounded-2xl flex items-center justify-center text-amber-500 shadow-lg">
          <Factory className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black tracking-tight">Recycler B2B Exchange Activation</h1>
        <p className="text-xs text-zinc-400 max-w-md text-center leading-relaxed">
          Logged in as <strong>{user?.name || 'Visitor'}</strong> ({user?.role || 'Guest'}). Click below to activate the CPCB-authorized Recycler session for bidding on segregated society scrap lots.
        </p>
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => switchDemoRole(UserRole.RECYCLER)}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-2"
          >
            <Factory className="w-4 h-4 text-zinc-950" />
            Switch to Recycler & Open B2B Market
          </button>
          <Link
            to="/"
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold transition-all"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: 'Procurement Dashboard', to: '/recycler/dashboard', icon: Factory },
    { label: 'Scrap & Lot Marketplace', to: '/recycler/marketplace', icon: ShoppingBag },
    { label: 'Purchase Orders & Manifests', to: '/recycler/orders', icon: FileText },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500 selection:text-zinc-950">
      <DemoRoleSwitcher />

      {/* Recycler B2B Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-40 px-4 sm:px-6 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-zinc-950 flex items-center justify-center font-black shadow-md">
            <Factory className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-sm tracking-tight text-white flex items-center gap-2">
              EcoRecycle B2B Exchange
              <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-mono font-bold uppercase flex items-center gap-1">
                <BadgeCheck className="w-3 h-3 text-amber-400" />
                CPCB Authorized
              </span>
            </div>
            <span className="text-[11px] text-zinc-400">License: CPCB/WMT/2024/0912 • Plastic & Metal Division</span>
          </div>
        </div>

        {/* Live Marketplace Indicator */}
        <div className="hidden sm:flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-xl text-amber-400">
            <Boxes className="w-3.5 h-3.5 text-amber-400" />
            <span>3 Lots Open for Bidding</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-xl text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Dry Waste ₹12.50/kg</span>
          </div>
        </div>

        {/* User Identity */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-xs font-bold text-white">{user.name}</div>
            <div className="text-[10px] text-amber-400 font-medium">Head of Procurement</div>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login/recycler');
            }}
            title="Log out"
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Nav Menu */}
      <nav className="bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 px-4 sm:px-6 py-2 sticky top-[61px] z-30 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-zinc-950 font-extrabold shadow-md'
                      : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Main Recycler Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      <footer className="bg-zinc-900 border-t border-zinc-800 py-3 px-6 text-center text-xs text-zinc-500 font-mono">
        EcoSetu Circular Economy Exchange • Digital Chain of Custody Verified
      </footer>
    </div>
  );
};
