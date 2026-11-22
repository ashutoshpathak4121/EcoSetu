import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../../../shared/types';
import {
  Home,
  QrCode,
  Sparkles,
  CalendarCheck,
  History,
  Coins,
  Gift,
  Truck,
  MapPin,
  Camera,
  Building2,
  Users,
  ShoppingBag,
  FileText,
  BarChart3,
  ShieldAlert,
  Radio,
  Settings,
  Scale,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;

  const getNavSections = (role: UserRole) => {
    switch (role) {
      case UserRole.RESIDENT:
        return [
          { label: 'Overview', to: '/resident/dashboard', icon: Home },
          { label: 'My Household ID', to: '/resident/household', icon: QrCode },
          { label: 'AI Waste Scanner', to: '/resident/ai-verify', icon: Sparkles },
          { label: 'Request Collection', to: '/resident/request', icon: CalendarCheck },
          { label: 'Collection History', to: '/resident/history', icon: History },
          { label: 'Waste Credits Ledger', to: '/resident/credits', icon: Coins },
          { label: 'Rewards Store', to: '/resident/rewards', icon: Gift },
        ];

      case UserRole.COLLECTOR:
        return [
          { label: 'Collector Run', to: '/collector/dashboard', icon: Home },
          { label: 'Assigned Route Tasks', to: '/collector/tasks', icon: Truck },
          { label: 'Ward GIS Map', to: '/collector/map', icon: MapPin },
          { label: 'Upload Proof & Weights', to: '/collector/upload', icon: Camera },
        ];

      case UserRole.SOCIETY_ADMIN:
        return [
          { label: 'RWA Overview', to: '/society/dashboard', icon: Home },
          { label: 'Resident Directory', to: '/society/households', icon: Users },
          { label: 'Marketplace Listings', to: '/society/marketplace', icon: ShoppingBag },
        ];

      case UserRole.RECYCLER:
        return [
          { label: 'Procurement Overview', to: '/recycler/dashboard', icon: Home },
          { label: 'Browse Verified Waste', to: '/recycler/marketplace', icon: Scale },
          { label: 'Bids & Orders', to: '/recycler/orders', icon: FileText },
        ];

      case UserRole.MCD_OFFICER:
        return [
          { label: 'MCD Command Center', to: '/municipal/dashboard', icon: Home },
          { label: 'Fleet Vehicle Tracking', to: '/municipal/fleet', icon: Radio },
          { label: 'Flagged Review Queue', to: '/municipal/flagged', icon: ShieldAlert },
        ];

      case UserRole.SUPER_ADMIN:
        return [
          { label: 'Platform Console', to: '/admin/dashboard', icon: Home },
          { label: 'User & Role Access', to: '/admin/users', icon: Users },
          { label: 'System Audit Logs', to: '/admin/logs', icon: Settings },
        ];

      default:
        return [{ label: 'Overview', to: '/resident/dashboard', icon: Home }];
    }
  };

  const navItems = getNavSections(user.role);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 min-h-[calc(100vh-6rem)]">
      {/* User profile capsule */}
      <div className="p-4 border-b border-gray-100 flex items-center space-x-3 bg-gray-50/50">
        <div className="w-10 h-10 rounded-full bg-forest-800 text-white font-bold flex items-center justify-center text-sm shadow-sm">
          {user.name.charAt(0)}
        </div>
        <div className="overflow-hidden">
          <h4 className="text-sm font-bold text-gray-900 truncate">{user.name}</h4>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-0.5 border border-emerald-200 uppercase tracking-wider">
            {user.role.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Nav items */}
      <nav className="p-4 space-y-1.5 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-forest-800 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-forest-50 hover:text-forest-900'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Sustainability Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 text-center space-y-1">
          <span className="text-[10px] uppercase font-bold text-emerald-800 block">4-Stream Challenge</span>
          <p className="text-[11px] text-gray-600">Keep wet & dry bags separated to maintain daily Green Streak</p>
        </div>
      </div>
    </aside>
  );
};
