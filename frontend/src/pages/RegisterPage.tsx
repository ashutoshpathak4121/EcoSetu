import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Recycle, Lock, Mail, User, Phone, Home, Building2, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { UserRole } from '../../../shared/types';

export const RegisterPage: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.RESIDENT);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    flatNumber: 'A-101',
    block: 'Block A',
    societyId: 'soc-green-meadows-01',
    businessName: '',
    cpcbLicenseNumber: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register({
        ...formData,
        role,
      });

      if (role === UserRole.COLLECTOR) navigate('/collector/dashboard');
      else if (role === UserRole.SOCIETY_ADMIN) navigate('/society/dashboard');
      else if (role === UserRole.RECYCLER) navigate('/recycler/dashboard');
      else navigate('/resident/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-6 bg-white p-8 rounded-3xl border border-gray-200 shadow-xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-forest-800 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <Recycle className="w-7 h-7 text-emerald-300" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Join the SwachhSetu Eco-Grid</h2>
          <p className="text-xs text-gray-500">Connect to your local 4-stream municipal segregation network</p>
        </div>

        {/* Role selection pill tabs */}
        <div className="grid grid-cols-4 p-1.5 bg-gray-100 rounded-xl text-xs font-bold text-center">
          <button
            type="button"
            onClick={() => setRole(UserRole.RESIDENT)}
            className={`py-2 rounded-lg transition-all ${
              role === UserRole.RESIDENT ? 'bg-white text-forest-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Resident
          </button>
          <button
            type="button"
            onClick={() => setRole(UserRole.COLLECTOR)}
            className={`py-2 rounded-lg transition-all ${
              role === UserRole.COLLECTOR ? 'bg-white text-forest-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Collector
          </button>
          <button
            type="button"
            onClick={() => setRole(UserRole.SOCIETY_ADMIN)}
            className={`py-2 rounded-lg transition-all ${
              role === UserRole.SOCIETY_ADMIN ? 'bg-white text-forest-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            RWA Admin
          </button>
          <button
            type="button"
            onClick={() => setRole(UserRole.RECYCLER)}
            className={`py-2 rounded-lg transition-all ${
              role === UserRole.RECYCLER ? 'bg-white text-forest-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Recycler
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Priya Sharma"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="priya.sharma@domain.com"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="At least 6 characters"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {role === UserRole.RESIDENT && (
            <div className="pt-2 border-t border-gray-100 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Select Registered Society / Complex</label>
                <select
                  value={formData.societyId}
                  onChange={(e) => setFormData({ ...formData, societyId: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="soc-green-meadows-01">Green Meadows Residency (Mayur Vihar Ph-1)</option>
                  <option value="soc-aravali-01">Aravali Heights Cooperative Housing (Ward 42)</option>
                  <option value="soc-samachar-01">Samachar Apartments (Pocket 1, East Delhi)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Flat / House No.</label>
                  <input
                    type="text"
                    required
                    value={formData.flatNumber}
                    onChange={(e) => setFormData({ ...formData, flatNumber: e.target.value })}
                    placeholder="e.g. B-402"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Tower / Block</label>
                  <input
                    type="text"
                    value={formData.block}
                    onChange={(e) => setFormData({ ...formData, block: e.target.value })}
                    placeholder="e.g. Tower B"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {role === UserRole.RECYCLER && (
            <div className="pt-2 border-t border-gray-100 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Enterprise Facility Name</label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="e.g. GreenPolymer Processing Solutions Pvt Ltd"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">CPCB / SPCB Waste Authorization No.</label>
                <input
                  type="text"
                  required
                  value={formData.cpcbLicenseNumber}
                  onChange={(e) => setFormData({ ...formData, cpcbLicenseNumber: e.target.value })}
                  placeholder="e.g. CPCB/WMT/2024/9082"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-mono text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                Register Account & Enter Portal
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-gray-500">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-emerald-700 hover:underline">
            Sign In to SwachhSetu
          </Link>
        </div>
      </div>
    </div>
  );
};
