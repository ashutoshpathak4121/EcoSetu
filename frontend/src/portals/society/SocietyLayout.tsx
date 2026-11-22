import React from 'react';
import { Outlet, Navigate, NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../../../shared/types';
import { DemoRoleSwitcher } from '../../components/DemoRoleSwitcher';
import {
  Building2,
  Users,
  Store,
  Leaf,
  LogOut,
  ShieldAlert,
  Award,
  Sparkles
} from 'lucide-react';

export const SocietyLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-950/20 text-gray-800">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="text-xs font-semibold text-indigo-900">Loading Society RWA Portal...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login/society" replace />;
  }

  if (user?.role !== UserRole.SOCIETY_ADMIN) {
    return (
      <div className="min-h-screen bg-indigo-50/40 flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-16 h-16 bg-indigo-100 border-2 border-indigo-300 rounded-2xl flex items-center justify-center text-indigo-700 shadow-sm">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">403: Society RWA Portal Restricted</h1>
        <p className="text-xs text-gray-600 max-w-md text-center leading-relaxed">
          Logged in as <strong>{user?.name}</strong> ({user?.role}). This portal is restricted to authorized Residential Welfare Association (RWA) administrators.
        </p>
        <div className="flex items-center gap-3 pt-2">
          <Link
            to="/login/society"
            className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-all"
          >
            Switch to Society Admin
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
    { label: 'RWA Overview', to: '/society/dashboard', icon: Building2 },
    { label: 'Apartments & Flats', to: '/society/households', icon: Users },
    { label: 'Recyclable Lot Aggregator', to: '/society/marketplace', icon: Store },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-gray-800 font-sans selection:bg-indigo-600 selection:text-white">
      <DemoRoleSwitcher />

      {/* RWA Portal Header */}
      <header className="bg-white border-b border-indigo-100 sticky top-8 z-40 px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-700 text-white flex items-center justify-center font-bold shadow-md">
            <Building2 className="w-5 h-5 text-indigo-200" />
          </div>
          <div>
            <div className="font-extrabold text-sm tracking-tight text-indigo-950 flex items-center gap-2">
              Green Meadows Residency RWA
              <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded font-mono font-bold uppercase">
                RWA Admin
              </span>
            </div>
            <span className="text-[11px] text-gray-500">Mayur Vihar Phase 1 • 140 Flats Connected</span>
          </div>
        </div>

        {/* Live Society Compliance Badge */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>91.4% Society Segregation Rate</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 bg-purple-50 border border-purple-200 rounded-xl text-xs font-bold text-purple-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zero-Landfill Society</span>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-xs font-bold text-gray-900">{user.name}</div>
            <div className="text-[10px] text-indigo-700 font-medium">Estate Manager</div>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login/society');
            }}
            title="Log out"
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* RWA Nav Bar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 px-6 py-2 sticky top-[4.75rem] z-30">
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
                      ? 'bg-indigo-700 text-white shadow-md'
                      : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-900'
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

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 py-3 px-6 text-center text-xs text-gray-500">
        Green Meadows RWA Portal • Powered by SwachhSetu WasteChakra Network
      </footer>
    </div>
  );
};
