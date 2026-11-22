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
          { label: 'Overview', to: '/dashboard/resident', icon: Home },
          { label: 'My Household ID', to: '/dashboard/resident/household', icon: QrCode },
          { label: 'AI Waste Scanner', to: '/dashboard/resident/ai-verify', icon: Sparkles },
          { label: 'Request Collection', to: '/dashboard/resident/request', icon: CalendarCheck },
          { label: 'Collection History', to: '/dashboard/resident/history', icon: History },
          { label: 'Waste Credits Ledger', to: '/dashboard/resident/credits', icon: Coins },
          { label: 'Rewards Store', to: '/dashboard/resident/rewards', icon: Gift },
        ];

      case UserRole.COLLECTOR:
        return [
          { label: 'Collector Run', to: '/dashboard/collector', icon: Home },
          { label: 'Assigned Route Tasks', to: '/dashboard/collector/tasks', icon: Truck },
          { label: 'Ward GIS Map', to: '/dashboard/collector/map', icon: MapPin },
          { label: 'Upload Proof & Weights', to: '/dashboard/collector/upload', icon: Camera },
        ];

      case UserRole.SOCIETY_ADMIN:
        return [
          { label: 'RWA Overview', to: '/dashboard/society', icon: Home },
          { label: 'Resident Directory', to: '/dashboard/society/households', icon: Users },
          { label: 'Marketplace Listings', to: '/dashboard/society/marketplace', icon: ShoppingBag },
        ];

      case UserRole.RECYCLER:
        return [
          { label: 'Procurement Overview', to: '/dashboard/recycler', icon: Home },
          { label: 'Browse Verified Waste', to: '/dashboard/recycler/marketplace', icon: Scale },
          { label: 'Bids & Orders', to: '/dashboard/recycler/orders', icon: FileText },
        ];

      case UserRole.MCD_OFFICER:
        return [
          { label: 'MCD Command Center', to: '/dashboard/municipal', icon: Home },
          { label: 'Fleet Vehicle Tracking', to: '/dashboard/municipal/fleet', icon: Radio },
          { label: 'Flagged Review Queue', to: '/dashboard/municipal/flagged', icon: ShieldAlert },
        ];

      case UserRole.SUPER_ADMIN:
        return [
          { label: 'Platform Console', to: '/dashboard/admin', icon: Home },
          { label: 'User & Role Access', to: '/dashboard/admin/users', icon: Users },
          { label: 'System Audit Logs', to: '/dashboard/admin/logs', icon: Settings },
        ];

      default:
        return [{ label: 'Overview', to: '/dashboard/resident', icon: Home }];
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
      <nav className="p-3 space-y-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to.split('/').length <= 3}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-forest-800 text-white shadow-sm font-bold'
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

      {/* Footer Info */}
      <div className="p-4 border-t border-gray-100 text-[11px] text-gray-400">
        <div>SwachhSetu v1.0.0</div>
        <div>Team MazeRunners • 2026</div>
      </div>
    </aside>
  );
};

