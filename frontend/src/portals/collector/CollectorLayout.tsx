import React from 'react';
import { Outlet, Navigate, NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../../../shared/types';
import { DemoRoleSwitcher } from '../../components/DemoRoleSwitcher';
import {
  Truck,
  CheckSquare,
  MapPin,
  Camera,
  BatteryCharging,
  Wifi,
  LogOut,
  ShieldAlert,
  Radio,
  Navigation
} from 'lucide-react';

export const CollectorLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="text-xs font-mono text-gray-300">Synchronizing Field Telemetry...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login/collector" replace />;
  }

  if (user?.role !== UserRole.COLLECTOR) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-16 h-16 bg-amber-500/10 border-2 border-amber-500 rounded-2xl flex items-center justify-center text-amber-500 shadow-lg">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black tracking-tight">403: Collector Portal Restricted</h1>
        <p className="text-xs text-slate-400 max-w-md text-center leading-relaxed">
          Logged in as <strong>{user?.name}</strong> ({user?.role}). Field collector credentials are required to operate sanitation beat assignments and geotagged collection proof.
        </p>
        <div className="flex items-center gap-3 pt-2">
          <Link
            to="/login/collector"
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition-all"
          >
            Switch to Collector Account
          </Link>
          <Link
            to="/"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: "Today's Beat", to: '/collector/dashboard', icon: Truck },
    { label: 'Household Tasks', to: '/collector/tasks', icon: CheckSquare },
    { label: 'Live GPS Map', to: '/collector/map', icon: MapPin },
    { label: 'Upload Proof', to: '/collector/upload', icon: Camera },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      <DemoRoleSwitcher />

      {/* Rugged Mobile-Optimized Field Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-8 z-40 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-sm tracking-tight text-white flex items-center gap-2">
              Field Operations Console
              <span className="text-[10px] bg-amber-400/10 text-amber-400 border border-amber-400/30 px-2 py-0.5 rounded font-mono font-bold uppercase flex items-center gap-1">
                <Radio className="w-2.5 h-2.5 animate-pulse text-amber-400" />
                DL-01-GA-4892
              </span>
            </div>
            <span className="text-[11px] text-slate-400">Ward 42 • East Delhi Municipal Beat</span>
          </div>
        </div>

        {/* Real-time telemetry indicators */}
        <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono">
          <div className="flex items-center gap-1 px-2 py-1 bg-slate-800/80 border border-slate-700 rounded-lg text-emerald-400">
            <Wifi className="w-3.5 h-3.5" />
            <span>4G Online</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-slate-800/80 border border-slate-700 rounded-lg text-amber-400">
            <BatteryCharging className="w-3.5 h-3.5" />
            <span>88% Battery</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-slate-800/80 border border-slate-700 rounded-lg text-sky-400">
            <Navigation className="w-3.5 h-3.5" />
            <span>GPS Active</span>
          </div>
        </div>

        {/* Driver identity */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-xs font-bold text-white">{user.name}</div>
            <div className="text-[10px] text-amber-400 font-medium">Sanitation Driver #4208</div>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login/collector');
            }}
            title="Log out"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-2 sticky top-[4.75rem] z-30 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
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

      {/* Main Field Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      {/* Mobile-Friendly Fixed Quick-Action Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-3 px-6 text-center text-xs text-slate-500 font-mono">
        Field Telemetry Active • Municipal Beat Sync v2.1 • MCD East Delhi Ward 42
      </footer>
    </div>
  );
};
