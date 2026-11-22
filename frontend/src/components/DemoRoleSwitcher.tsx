import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../../../shared/types';
import { useNavigate } from 'react-router-dom';
import { UserCheck, Shield, Sparkles, Home, Truck, Building2, Factory, Landmark } from 'lucide-react';

export const DemoRoleSwitcher: React.FC = () => {
  const { user, switchDemoRole } = useAuth();
  const navigate = useNavigate();

  const roles = [
    { role: UserRole.RESIDENT, label: 'Resident', path: '/resident/dashboard', icon: Home },
    { role: UserRole.COLLECTOR, label: 'Collector', path: '/collector/dashboard', icon: Truck },
    { role: UserRole.SOCIETY_ADMIN, label: 'Society RWA', path: '/society/dashboard', icon: Building2 },
    { role: UserRole.RECYCLER, label: 'Recycler', path: '/recycler/dashboard', icon: Factory },
    { role: UserRole.MCD_OFFICER, label: 'MCD Command', path: '/municipal/dashboard', icon: Landmark },
    { role: UserRole.SUPER_ADMIN, label: 'Super Admin', path: '/admin/dashboard', icon: Shield },
  ];

  const handleSwitch = async (role: UserRole, targetPath: string) => {
    try {
      await switchDemoRole(role);
    } catch (e) {
      console.error('Role switch failed', e);
    } finally {
      navigate(targetPath);
    }
  };

  return (
    <div className="bg-forest-900 text-white text-xs py-2 px-4 border-b border-forest-800 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-emerald-300 tracking-wide flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            EcoSetu Live Portals
          </span>
          <span className="text-gray-400 hidden sm:inline">| Quick Switcher:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {roles.map(({ role, label, path, icon: Icon }) => {
            const isActive = user?.role === role;
            return (
              <button
                key={role}
                onClick={() => handleSwitch(role, path)}
                className={`px-2.5 py-1 rounded-lg font-medium border transition-all duration-150 flex items-center gap-1.5 text-[11px] ${
                  isActive
                    ? 'bg-emerald-500 text-white border-emerald-400 font-bold shadow-sm'
                    : 'bg-forest-800/90 text-gray-200 border-forest-700 hover:bg-forest-700 hover:text-white'
                }`}
                title={`Switch to ${label} portal`}
              >
                {isActive ? (
                  <UserCheck className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Icon className="w-3.5 h-3.5 text-emerald-400/80" />
                )}
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
