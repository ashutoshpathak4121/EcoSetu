import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Recycle,
  Lock,
  Mail,
  User,
  Phone,
  Home,
  Building2,
  ArrowRight,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  Eye,
  EyeOff,
  ShieldCheck,
} from 'lucide-react';
import { UserRole } from '../../../shared/types';

export const RegisterPage: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.RESIDENT);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    flatNumber: 'A-101',
    block: 'Block A',
    societyId: 'soc-green-meadows-01',
    businessName: '',
    cpcbLicenseNumber: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  // Password strength calculation
  const hasMinLength = formData.password.length >= 8;
  const hasUppercase = /[A-Z]/.test(formData.password);
  const hasLowercase = /[a-z]/.test(formData.password);
  const hasSpecialOrDigit = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password);
  const strengthScore = [hasMinLength, hasUppercase, hasLowercase, hasSpecialOrDigit].filter(Boolean).length;

  const getStrengthMeta = () => {
    if (!formData.password) return { label: 'None', color: 'bg-gray-200', text: 'text-gray-400' };
    if (strengthScore <= 2) return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-600' };
    if (strengthScore === 3) return { label: 'Medium', color: 'bg-amber-500', text: 'text-amber-600' };
    return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-600' };
  };

  const strengthMeta = getStrengthMeta();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation checks
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setError('Please provide your full legal or civic name (minimum 2 characters).');
      return;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError('Please provide a valid email address.');
      return;
    }

    if (!hasMinLength || !hasUppercase || !hasLowercase || !hasSpecialOrDigit) {
      setError('Password must be at least 8 characters and include uppercase, lowercase, and a number or symbol.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    if (!formData.termsAccepted) {
      setError('Please accept the EcoSetu Community Standards and Terms of Service to proceed.');
      return;
    }

    setLoading(true);

    try {
      await register({
        ...formData,
        email: formData.email.trim().toLowerCase(),
        name: formData.name.trim(),
        role,
      });

      setSuccessMsg('Account registered successfully! Redirecting to your dashboard...');

      setTimeout(() => {
        if (role === UserRole.COLLECTOR) navigate('/collector/dashboard');
        else if (role === UserRole.SOCIETY_ADMIN) navigate('/society/dashboard');
        else if (role === UserRole.RECYCLER) navigate('/recycler/dashboard');
        else navigate('/resident/dashboard');
      }, 900);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Registration failed. Please check details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-6 bg-white p-8 rounded-3xl border border-gray-200 shadow-xl">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <img src="/logo-transparent.png" alt="EcoSetu Logo" className="h-16 w-auto object-contain" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Join the EcoSetu Eco-Grid</h2>
          <p className="text-xs text-gray-500">Connect to your local 4-stream municipal segregation network</p>
        </div>

        {/* Role selection pill tabs (Notice: Privileged roles SUPER_ADMIN & MCD_OFFICER omitted) */}
        <div>
          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Select Your Participant Account Role
          </label>
          <div className="grid grid-cols-4 p-1.5 bg-gray-100 rounded-xl text-xs font-bold text-center">
            <button
              type="button"
              onClick={() => setRole(UserRole.RESIDENT)}
              className={`py-2 rounded-lg transition-all ${
                role === UserRole.RESIDENT ? 'bg-white text-forest-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Household
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
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Full Legal Name *</label>
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
              <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="priya.sharma@example.com"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Min 8 chars, 1 upper, 1 digit"
                  className="w-full pl-3.5 pr-10 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm Password *</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Re-enter your password"
                  className="w-full pl-3.5 pr-10 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">Password Strength:</span>
                <span className={`font-bold ${strengthMeta.text}`}>{strengthMeta.label}</span>
              </div>
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden flex gap-1">
                <div
                  className={`h-full transition-all duration-300 ${strengthMeta.color}`}
                  style={{ width: `${(strengthScore / 4) * 100}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-2 gap-1 text-[10px] text-gray-500 pt-1">
                <div className={`flex items-center gap-1 ${hasMinLength ? 'text-emerald-700 font-bold' : ''}`}>
                  <span>{hasMinLength ? '✓' : '•'} 8+ characters</span>
                </div>
                <div className={`flex items-center gap-1 ${hasUppercase ? 'text-emerald-700 font-bold' : ''}`}>
                  <span>{hasUppercase ? '✓' : '•'} 1 uppercase letter</span>
                </div>
                <div className={`flex items-center gap-1 ${hasLowercase ? 'text-emerald-700 font-bold' : ''}`}>
                  <span>{hasLowercase ? '✓' : '•'} 1 lowercase letter</span>
                </div>
                <div className={`flex items-center gap-1 ${hasSpecialOrDigit ? 'text-emerald-700 font-bold' : ''}`}>
                  <span>{hasSpecialOrDigit ? '✓' : '•'} 1 number or symbol</span>
                </div>
              </div>
            </div>
          )}

          {/* Role-specific details */}
          {role === UserRole.RESIDENT && (
            <div className="pt-2 border-t border-gray-100 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Select Registered Society / Residential Area
                </label>
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
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Flat / Unit No. *</label>
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
                <label className="block text-xs font-semibold text-gray-700 mb-1">Enterprise Facility Name *</label>
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
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  CPCB / SPCB Waste Authorization No. *
                </label>
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

          {/* Terms & Conditions Acceptance */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                className="mt-0.5 w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
              />
              <span className="text-xs text-gray-600 leading-snug">
                I agree to the{' '}
                <a href="#terms" className="text-emerald-700 font-bold hover:underline">
                  Terms of Service
                </a>{' '}
                and commit to mandatory 4-stream source waste segregation under the EcoSetu Community Guidelines.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Creating Verified Account...
              </span>
            ) : (
              <>
                Register Account & Enter Portal
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-gray-500 space-y-1">
          <div>
            Already registered?{' '}
            <Link to="/login" className="font-bold text-emerald-700 hover:underline">
              Sign In to EcoSetu
            </Link>
          </div>
          <div>
            Forgot your password?{' '}
            <Link to="/forgot-password" className="font-semibold text-gray-500 hover:text-emerald-700 hover:underline">
              Reset Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
