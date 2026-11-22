import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Truck, Lock, Mail, ArrowRight, AlertCircle, Sparkles, Navigation } from 'lucide-react';

export const CollectorLoginPage: React.FC = () => {
  const [email, setEmail] = useState('collector@swachhsetu.in');
  const [password, setPassword] = useState('Password@123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      navigate('/collector/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Field authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-6 bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl text-slate-100">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-amber-400 text-slate-950 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <Truck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">Collector Field Portal</h2>
          <p className="text-xs text-slate-400">Sanitation Driver & Field Collection Operatives Sign-In</p>
        </div>

        <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-3 text-xs text-amber-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            Field Collector Credentials:
          </span>
          <span className="font-mono text-[11px] text-slate-300">collector@swachhsetu.in</span>
        </div>

        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Operative Email ID</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="collector@swachhsetu.in"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-amber-400" />
              Vehicle Telemetry Link:
            </span>
            <span className="font-mono text-amber-400 font-bold">DL-01-GA-4892</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Starting Beat Session...' : 'Sign In & Start Beat'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Return to{' '}
          <Link to="/" className="text-amber-400 font-bold hover:underline">
            SwachhSetu Home
          </Link>
        </div>
      </div>
    </div>
  );
};
