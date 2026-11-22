import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Building2, Lock, Mail, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

export const SocietyLoginPage: React.FC = () => {
  const [email, setEmail] = useState('society@ecosetu.in');
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
      navigate('/society/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Society authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-3xl border border-gray-200 shadow-xl">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <img src="/logo-transparent.png" alt="EcoSetu Logo" className="h-14 w-auto object-contain" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Society RWA Portal</h2>
          <p className="text-xs text-gray-500">Residential Welfare Association & Estate Management Console</p>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-xs text-indigo-900 flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Society RWA Demo Account:
          </span>
          <span className="font-mono text-[11px]">society@ecosetu.in</span>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">RWA Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="society@ecosetu.in"
                className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
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
                className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-700 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Authenticating RWA...' : 'Sign In to Society Portal'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-gray-500">
          Return to{' '}
          <Link to="/" className="text-indigo-700 font-bold hover:underline">
            EcoSetu Home
          </Link>
        </div>
      </div>
    </div>
  );
};
