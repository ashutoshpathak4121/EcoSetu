import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, ArrowRight, AlertCircle, CheckCircle2, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState(searchParams.get('token') || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const queryToken = searchParams.get('token');
    if (queryToken) setToken(queryToken);
  }, [searchParams]);

  // Password strength calculation
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecialOrDigit = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const strengthScore = [hasMinLength, hasUppercase, hasLowercase, hasSpecialOrDigit].filter(Boolean).length;

  const getStrengthMeta = () => {
    if (!password) return { label: 'None', color: 'bg-gray-200', text: 'text-gray-400' };
    if (strengthScore <= 2) return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-600' };
    if (strengthScore === 3) return { label: 'Medium', color: 'bg-amber-500', text: 'text-amber-600' };
    return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-600' };
  };

  const strengthMeta = getStrengthMeta();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token.trim()) {
      setError('Please provide a valid password reset token.');
      return;
    }

    if (!hasMinLength || !hasUppercase || !hasLowercase || !hasSpecialOrDigit) {
      setError('New password must be at least 8 characters long and contain uppercase, lowercase, and a number or symbol.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);

    try {
      await resetPassword({
        token: token.trim(),
        password,
        confirmPassword,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to reset password. The link may have expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-3xl border border-gray-200 shadow-xl">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Set New Password</h2>
          <p className="text-xs text-gray-500">
            Create a strong, verified credential to regain access to your EcoSetu participant account.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-2 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <div className="font-bold text-sm text-emerald-800">Password Reset Complete!</div>
              <p className="text-emerald-700">
                Your password has been successfully updated in our database. Redirecting you to the sign-in portal...
              </p>
            </div>
            <Link
              to="/login"
              className="w-full py-2.5 bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              Sign In with New Password
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Security Reset Token</label>
              <input
                type="text"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter or paste reset token"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 chars, 1 upper, 1 digit"
                  className="w-full pl-3.5 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
              <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full pl-3.5 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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

            {/* Strength Meter */}
            {password && (
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">Strength:</span>
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Updating Password...
                </span>
              ) : (
                <>
                  Save New Password & Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <Link to="/login" className="text-xs font-semibold text-gray-500 hover:text-emerald-700 hover:underline">
                Return to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
