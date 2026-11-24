import React from 'react';
import { Outlet, Navigate, NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../../../shared/types';
import { DemoRoleSwitcher } from '../../components/DemoRoleSwitcher';
import { Shield, ShieldAlert, Users, Settings, Activity, Database, LogOut, Terminal, Lock, User } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout, switchDemoRole } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      switchDemoRole(UserRole.SUPER_ADMIN);
    }
  }, [isLoading, isAuthenticated, switchDemoRole]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="text-xs font-mono text-gray-400">Loading Enterprise Admin Core...</div>
        </div>
      </div>
    );
  }

  // Strict RBAC gate
  if (user?.role !== UserRole.SUPER_ADMIN) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-16 h-16 bg-rose-500/10 border-2 border-rose-500 rounded-2xl flex items-center justify-center text-rose-500 shadow-lg">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black tracking-tight">Super Administrator Activation</h1>
        <p className="text-xs text-gray-400 max-w-md text-center leading-relaxed">
          Your current account <strong>{user?.email || 'Visitor'}</strong> holds the role of <strong>{user?.role || 'Guest'}</strong>. Click below to activate the Super Admin master governance console.
        </p>
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => switchDemoRole(UserRole.SUPER_ADMIN)}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-2"
          >
            <Shield className="w-4 h-4 text-white" />
            Switch to Super Admin & Enter Console
          </button>
          <Link
            to="/"
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl text-xs font-bold transition-all"
          >
            Return to Public Home
          </Link>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: 'Overview Console', to: '/admin/dashboard', icon: Activity },
    { label: 'User & Role Access', to: '/admin/users', icon: Users },
    { label: 'Security & Audit Logs', to: '/admin/logs', icon: Lock },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100 font-sans selection:bg-emerald-500 selection:text-black">
      <DemoRoleSwitcher />

      {/* Top Authoritative Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 text-black flex items-center justify-center font-black shadow-md">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-sm tracking-tight text-white flex items-center gap-2">
              EcoSetu Enterprise Admin
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold uppercase">
                Root Access
              </span>
            </div>
            <span className="text-[11px] text-gray-400">Enterprise Core Infrastructure</span>
          </div>
        </div>

        {/* Live System Badges */}
        <div className="hidden lg:flex items-center space-x-4 text-xs font-mono text-gray-300">
          <div className="flex items-center gap-1.5 bg-gray-800/80 px-2.5 py-1 rounded-lg border border-gray-700">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Uptime: 99.98%
          </div>
          <div className="flex items-center gap-1.5 bg-gray-800/80 px-2.5 py-1 rounded-lg border border-gray-700">
            <Database className="w-3.5 h-3.5 text-blue-400" />
            PG16: Connected
          </div>
          <div className="flex items-center gap-1.5 bg-gray-800/80 px-2.5 py-1 rounded-lg border border-gray-700">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            API Gateway: 5000
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Link to="/profile" className="text-right hidden sm:block hover:opacity-80 transition-opacity" title="Manage Profile">
            <span className="text-xs text-gray-300 font-semibold">{user.name}</span>
            <div className="text-[10px] text-emerald-400 font-mono">System SuperAdmin</div>
          </Link>
          <Link
            to="/profile"
            className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg border border-gray-700 transition-colors"
            title="Profile Settings"
          >
            <User className="w-4 h-4" />
          </Link>
          <button
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            className="p-2 bg-gray-800 hover:bg-rose-900/40 text-gray-400 hover:text-rose-400 rounded-lg border border-gray-700 transition-colors"
            title="Log Out Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Mobile Horizontal Sub-Navigation (< lg) */}
      <nav className="lg:hidden bg-gray-900/95 backdrop-blur-md border-b border-gray-800 px-3 py-2 sticky top-[57px] z-30 overflow-x-auto flex items-center space-x-2 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-black shadow-sm font-black'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white bg-gray-800/80 border border-gray-700'
                }`
              }
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 gap-6">
        <aside className="hidden lg:flex w-60 bg-gray-900/90 border border-gray-800 rounded-2xl p-4 flex-col flex-shrink-0 h-fit space-y-2">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 py-1">
            Governance Console
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
                        ? 'bg-emerald-500 text-black shadow-md'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-gray-800 text-[10px] text-gray-400 font-mono space-y-1 px-3">
            <div>Security Protocol: TLS 1.3</div>
            <div>RBAC: Strict Enforcement</div>
          </div>
        </aside>

        <main className="flex-1 min-w-0 w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
