import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, ArrowRight, AlertCircle, CheckCircle2, ShieldCheck, KeyRound } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ message: string; resetToken?: string } | null>(null);

  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await forgotPassword(email.trim().toLowerCase());
      setSuccessData(res);
    } catch (err: any) {
      // Benign fallback preventing enumeration
      setSuccessData({
        message: 'If that email address is in our system, we have sent instructions to reset your password.',
      });
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
              <KeyRound className="w-6 h-6" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Forgot Password</h2>
          <p className="text-xs text-gray-500">
            Enter your registered email address and we'll send you secure verification instructions to reset your credentials.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {successData ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Reset Instructions Dispatched</span>
              </div>
              <p className="text-emerald-700 leading-relaxed">{successData.message}</p>
            </div>

            {successData.resetToken && (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-3">
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Test / Verification Mode Active:
                </div>
                <p className="text-xs text-gray-600">
                  Your secure reset token is ready. Click below to proceed to the password update screen:
                </p>
                <Link
                  to={`/reset-password?token=${successData.resetToken}`}
                  className="w-full py-2.5 bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all"
                >
                  Proceed to Reset Password
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            <div className="text-center pt-2">
              <Link to="/login" className="text-xs font-bold text-emerald-700 hover:underline">
                Return to Sign In
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Registered Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="resident@ecosetu.in"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Sending Request...
                </span>
              ) : (
                <>
                  Send Recovery Link
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
              <Link to="/login" className="font-semibold hover:text-emerald-700 hover:underline">
                Remember your password? Sign in
              </Link>
              <Link to="/register" className="font-semibold hover:text-emerald-700 hover:underline">
                Register
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
