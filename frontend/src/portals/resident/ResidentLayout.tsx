import React from 'react';
import { Outlet, Navigate, NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../../../shared/types';
import { DemoRoleSwitcher } from '../../components/DemoRoleSwitcher';
import {
  Home,
  QrCode,
  Sparkles,
  CalendarCheck,
  History,
  Coins,
  Gift,
  Recycle,
  LogOut,
  User,
  ShieldAlert,
} from 'lucide-react';

export const ResidentLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout, switchDemoRole } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      switchDemoRole(UserRole.RESIDENT);
    }
  }, [isLoading, isAuthenticated, switchDemoRole]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-civic-bg">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="text-xs font-semibold text-gray-500">Loading Resident Portal...</div>
        </div>
      </div>
    );
  }

  if (user?.role !== UserRole.RESIDENT) {
    return (
      <div className="min-h-screen bg-civic-bg flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-16 h-16 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Resident Portal Activation</h1>
        <p className="text-xs text-gray-500 max-w-md text-center leading-relaxed">
          Currently viewed as <strong>{user?.name || 'Visitor'}</strong> ({user?.role || 'Guest'}). Click below to instantly activate the Resident household demo session.
        </p>
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => switchDemoRole(UserRole.RESIDENT)}
            className="px-5 py-2.5 bg-forest-800 hover:bg-forest-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            Switch to Resident & Open Portal
          </button>
          <Link
            to="/"
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: 'Overview', to: '/resident/dashboard', icon: Home },
    { label: 'My Household QR', to: '/resident/household', icon: QrCode },
    { label: 'AI Waste Scanner', to: '/resident/ai-verify', icon: Sparkles },
    { label: 'Request Pickup', to: '/resident/request', icon: CalendarCheck },
    { label: 'Collection History', to: '/resident/history', icon: History },
    { label: 'Green Credits Wallet', to: '/resident/credits', icon: Coins },
    { label: 'Redeem Rewards', to: '/resident/rewards', icon: Gift },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-civic-charcoal font-sans">
      <DemoRoleSwitcher />

      {/* Resident Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
        <Link to="/resident/dashboard" className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center p-1 shadow-xs">
            <img src="/logo-icon.png" alt="EcoSetu" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="font-extrabold text-sm tracking-tight text-forest-900 flex items-center gap-2">
              EcoSetu Resident Portal
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                Household Hub
              </span>
            </div>
            <span className="text-[10px] text-gray-500">Source Segregation & Rewards</span>
          </div>
        </Link>

        <div className="flex items-center space-x-2">
          <Link to="/profile" className="text-right hidden sm:block hover:opacity-80 transition-opacity" title="Manage Profile">
            <div className="text-xs font-bold text-gray-900">{user.name}</div>
            <div className="text-[10px] text-emerald-700 font-bold">HH-DL-WZ1-0042 • Flat B-402</div>
          </Link>
          <Link
            to="/profile"
            className="p-2 text-gray-500 hover:text-emerald-700 rounded-lg border border-gray-200 hover:border-emerald-200 hover:bg-emerald-50 transition-colors"
            title="Profile Settings"
          >
            <User className="w-4 h-4" />
          </Link>
          <button
            onClick={() => {
              logout();
              navigate('/login/resident');
            }}
            className="p-2 text-gray-400 hover:text-rose-600 rounded-lg border border-gray-200 hover:border-rose-200 hover:bg-rose-50 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Mobile Horizontal Sub-Navigation (< lg) */}
      <nav className="lg:hidden bg-white/95 backdrop-blur-md border-b border-gray-200 px-3 py-2 sticky top-[57px] z-30 overflow-x-auto flex items-center space-x-2 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-forest-800 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 bg-gray-50 border border-gray-200'
                }`
              }
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 gap-6">
        <aside className="hidden lg:flex w-60 bg-white border border-gray-200 rounded-2xl p-4 flex-col flex-shrink-0 h-fit space-y-2 shadow-xs">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 py-1">
            Household Navigation
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-forest-800 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 min-w-0 w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
