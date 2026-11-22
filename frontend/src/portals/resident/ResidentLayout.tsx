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
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();

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

  if (!isAuthenticated) {
    return <Navigate to="/login/resident" replace />;
  }

  if (user?.role !== UserRole.RESIDENT) {
    return (
      <div className="min-h-screen bg-civic-bg flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-16 h-16 bg-rose-50 border-2 border-rose-300 rounded-2xl flex items-center justify-center text-rose-600 shadow-sm">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">403: Resident Portal Restricted</h1>
        <p className="text-xs text-gray-500 max-w-md text-center leading-relaxed">
          You are signed in as <strong>{user?.name}</strong> ({user?.role}). Please switch to a registered Resident account to access the household segregation hub.
        </p>
        <div className="flex items-center gap-3 pt-2">
          <Link
            to="/login/resident"
            className="px-4 py-2 bg-forest-800 hover:bg-forest-700 text-white rounded-xl text-xs font-bold transition-all"
          >
            Switch to Resident
          </Link>
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
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-8 z-40 px-6 py-3 flex items-center justify-between shadow-xs">
        <Link to="/resident/dashboard" className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-forest-800 text-white flex items-center justify-center shadow-md">
            <Recycle className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <div className="font-extrabold text-sm tracking-tight text-forest-900 flex items-center gap-2">
              SwachhSetu Resident Portal
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                Household Hub
              </span>
            </div>
            <span className="text-[10px] text-gray-500">Source Segregation & Rewards</span>
          </div>
        </Link>

        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-gray-900">{user.name}</div>
            <div className="text-[10px] text-emerald-700 font-bold">HH-DL-WZ1-0042 • Flat B-402</div>
          </div>
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

      {/* Main Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        <aside className="w-60 bg-white border border-gray-200 rounded-2xl p-4 flex flex-col flex-shrink-0 h-fit space-y-2 shadow-xs">
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

        <main className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
