import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Recycle,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Home,
  Truck,
  Building2,
  Factory,
  Landmark,
  Shield
} from 'lucide-react';
import { UserRole } from '../../../shared/types';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('resident@ecosetu.in');
  const [password, setPassword] = useState('Password@123');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      if (email.includes('collector')) navigate('/collector/dashboard');
      else if (email.includes('society')) navigate('/society/dashboard');
      else if (email.includes('recycler')) navigate('/recycler/dashboard');
      else if (email.includes('mcd')) navigate('/municipal/dashboard');
      else if (email.includes('admin')) navigate('/admin/dashboard');
      else navigate('/resident/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const setPreset = (presetEmail: string) => {
    setEmail(presetEmail);
    setPassword('Password@123');
    setError(null);
  };

  const portalEntries = [
    { name: 'Resident Portal', path: '/login/resident', icon: Home, color: 'text-emerald-700 bg-emerald-50 border-emerald-200 hover:border-emerald-400' },
    { name: 'Collector Portal', path: '/login/collector', icon: Truck, color: 'text-amber-700 bg-amber-50 border-amber-200 hover:border-amber-400' },
    { name: 'Society RWA Portal', path: '/login/society', icon: Building2, color: 'text-indigo-700 bg-indigo-50 border-indigo-200 hover:border-indigo-400' },
    { name: 'Recycler B2B Portal', path: '/login/recycler', icon: Factory, color: 'text-amber-800 bg-amber-100/60 border-amber-300 hover:border-amber-400' },
    { name: 'MCD Command Center', path: '/login/municipal', icon: Landmark, color: 'text-rose-700 bg-rose-50 border-rose-200 hover:border-rose-400' },
    { name: 'Super Admin Access', path: '/admin/login', icon: Shield, color: 'text-gray-800 bg-gray-100 border-gray-300 hover:border-gray-400' },
  ];

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 bg-white p-8 rounded-3xl border border-gray-200 shadow-xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-forest-800 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <Recycle className="w-7 h-7 text-emerald-300" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">EcoSetu Universal Sign In</h2>
          <p className="text-xs text-gray-500">Sign in to your role account or choose your dedicated portal entrance below</p>
        </div>

        {/* Dedicated 6-Portal Gateway Grid */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center justify-between">
            <span>Direct Dedicated Portal Logins:</span>
            <span className="text-emerald-700 font-semibold">6 Segregated Portals</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {portalEntries.map((portal) => {
              const Icon = portal.icon;
              return (
                <Link
                  key={portal.path}
                  to={portal.path}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center text-center gap-1.5 transition-all shadow-sm ${portal.color}`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-[11px] leading-tight">{portal.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Demo Fast Login Pills for Evaluators */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3.5 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-900 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Evaluation Fast-Fill Presets:
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-[11px]">
            <button
              type="button"
              onClick={() => setPreset('resident@ecosetu.in')}
              className="py-1 px-2 rounded-lg bg-white border border-emerald-300 font-semibold text-emerald-900 hover:bg-emerald-100 transition-colors"
            >
              Resident
            </button>
            <button
              type="button"
              onClick={() => setPreset('collector@ecosetu.in')}
              className="py-1 px-2 rounded-lg bg-white border border-emerald-300 font-semibold text-emerald-900 hover:bg-emerald-100 transition-colors"
            >
              Collector
            </button>
            <button
              type="button"
              onClick={() => setPreset('society@ecosetu.in')}
              className="py-1 px-2 rounded-lg bg-white border border-emerald-300 font-semibold text-emerald-900 hover:bg-emerald-100 transition-colors"
            >
              Society RWA
            </button>
            <button
              type="button"
              onClick={() => setPreset('recycler@ecosetu.in')}
              className="py-1 px-2 rounded-lg bg-white border border-emerald-300 font-semibold text-emerald-900 hover:bg-emerald-100 transition-colors"
            >
              Recycler
            </button>
            <button
              type="button"
              onClick={() => setPreset('mcd@ecosetu.in')}
              className="py-1 px-2 rounded-lg bg-white border border-emerald-300 font-semibold text-emerald-900 hover:bg-emerald-100 transition-colors"
            >
              MCD Officer
            </button>
            <button
              type="button"
              onClick={() => setPreset('admin@ecosetu.in')}
              className="py-1 px-2 rounded-lg bg-white border border-emerald-300 font-semibold text-emerald-900 hover:bg-emerald-100 transition-colors"
            >
              Super Admin
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="resident@ecosetu.in"
                className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                Sign In & Enter Assigned Portal
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-gray-500">
          Don't have a registered household?{' '}
          <Link to="/register" className="font-bold text-emerald-700 hover:underline">
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
};
