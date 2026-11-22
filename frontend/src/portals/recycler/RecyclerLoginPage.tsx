import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Factory, Lock, Mail, ArrowRight, AlertCircle, Sparkles, Award } from 'lucide-react';

export const RecyclerLoginPage: React.FC = () => {
  const [email, setEmail] = useState('recycler@ecosetu.in');
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
      navigate('/recycler/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Recycler authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-6 bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl text-zinc-100">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <img src="/logo-transparent.png" alt="EcoSetu Logo" className="h-14 w-auto object-contain" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">Authorized Recycler Portal</h2>
          <p className="text-xs text-zinc-400">B2B Material Procurement & Chain-of-Custody Sign-In</p>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            Recycler Enterprise Demo:
          </span>
          <span className="font-mono text-[11px] text-zinc-300">recycler@ecosetu.in</span>
        </div>

        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Corporate Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="recycler@ecosetu.in"
                className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Access Key / Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700 text-[11px] text-zinc-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              CPCB License State:
            </span>
            <span className="font-mono text-amber-400 font-bold">CPCB/WMT/2024/0912</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Authenticating Enterprise...' : 'Sign In to Procurement Desk'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-zinc-500">
          Return to{' '}
          <Link to="/" className="text-amber-400 font-bold hover:underline">
            EcoSetu Home
          </Link>
        </div>
      </div>
    </div>
  );
};
