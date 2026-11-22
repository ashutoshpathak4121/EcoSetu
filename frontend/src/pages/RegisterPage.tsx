import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Recycle, ArrowRight, AlertCircle, Building, Home, User, Mail, Lock, Phone } from 'lucide-react';
import { UserRole } from '../../../shared/types';

export const RegisterPage: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.RESIDENT);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    societyId: 'soc-gulmohar-01',
    flatNumber: '',
    wingBlock: '',
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

      if (role === UserRole.COLLECTOR) navigate('/dashboard/collector');
      else if (role === UserRole.SOCIETY_ADMIN) navigate('/dashboard/society');
      else if (role === UserRole.RECYCLER) navigate('/dashboard/recycler');
      else navigate('/dashboard/resident');
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
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Onboard to SwachhSetu</h2>
          <p className="text-xs text-gray-500">Join the municipal circular waste management network</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-gray-100 rounded-xl text-xs font-bold text-center">
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
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="soc-gulmohar-01">Gulmohar Enclave RWA (Mayur Vihar Ph-1, Ward 203)</option>
                  <option value="soc-aravali-02">Aravali Heights Housing (Vasant Kunj, Ward 142)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Flat / Unit Number</label>
                  <input
                    type="text"
                    required
                    value={formData.flatNumber}
                    onChange={(e) => setFormData({ ...formData, flatNumber: e.target.value })}
                    placeholder="e.g. C-104"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Wing / Block</label>
                  <input
                    type="text"
                    value={formData.wingBlock}
                    onChange={(e) => setFormData({ ...formData, wingBlock: e.target.value })}
                    placeholder="e.g. Block C"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                Complete Registration
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-gray-500">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-emerald-700 hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};

