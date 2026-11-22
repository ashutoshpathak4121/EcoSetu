import React from 'react';
import { Outlet, Navigate, NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../../../shared/types';
import { DemoRoleSwitcher } from '../../components/DemoRoleSwitcher';
import {
  Landmark,
  Radio,
  AlertTriangle,
  MapPin,
  ShieldAlert,
  LogOut,
  Flame,
  FileCheck2,
  Building
} from 'lucide-react';

export const MunicipalLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="text-xs font-mono text-slate-300">Connecting to Municipal Command Grid...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login/municipal" replace />;
  }

  if (user?.role !== UserRole.MCD_OFFICER) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-16 h-16 bg-rose-500/10 border-2 border-rose-500 rounded-2xl flex items-center justify-center text-rose-500 shadow-lg">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black tracking-tight">403: Municipal Command Access Restricted</h1>
        <p className="text-xs text-slate-400 max-w-md text-center leading-relaxed">
          Logged in as <strong>{user?.name}</strong> ({user?.role}). This command center is restricted to authorized Municipal Corporation of Delhi (MCD) officers.
        </p>
        <div className="flex items-center gap-3 pt-2">
          <Link
            to="/login/municipal"
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all"
          >
            Switch to MCD Officer
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
    { label: 'Ward 42 Command', to: '/municipal/dashboard', icon: Landmark },
    { label: 'GIS Fleet Telemetry', to: '/municipal/fleet', icon: Radio },
    { label: 'Flagged Evidence Audit', to: '/municipal/flagged', icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-rose-600 selection:text-white">
      <DemoRoleSwitcher />

      {/* Official Government Command Center Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-8 z-40 px-6 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-amber-600 text-white flex items-center justify-center font-black shadow-md border border-rose-400/40">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <div className="font-extrabold text-sm tracking-tight text-white flex items-center gap-2">
              Municipal Corporation of Delhi (MCD)
              <span className="text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded font-mono font-bold uppercase">
                Zone East • Ward 42
              </span>
            </div>
            <span className="text-[11px] text-slate-400">Swachh Bharat Digital Governance Grid</span>
          </div>
        </div>

        {/* Live Ward Metrics */}
        <div className="hidden sm:flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 border border-slate-700 rounded-xl text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>12/14 Vehicles Active</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 border border-slate-700 rounded-xl text-amber-400">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>2 Flagged AI Reviews</span>
          </div>
        </div>

        {/* Officer Profile */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-xs font-bold text-white">{user.name}</div>
            <div className="text-[10px] text-rose-400 font-medium">Chief Sanitary Inspector</div>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login/municipal');
            }}
            title="Log out"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Nav Menu */}
      <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-2 sticky top-[4.75rem] z-30">
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
                      ? 'bg-rose-600 text-white shadow-md font-extrabold'
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

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 py-3 px-6 text-center text-xs text-slate-500 font-mono">
        MCD East Delhi Municipal Portal • Official Government Interface • Techathon 2026
      </footer>
    </div>
  );
};
