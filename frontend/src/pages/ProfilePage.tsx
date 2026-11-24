import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Mail,
  Phone,
  Shield,
  ShieldCheck,
  Lock,
  KeyRound,
  LogOut,
  Save,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Eye,
  EyeOff,
  Building,
  Calendar,
} from 'lucide-react';
import { UserRole } from '../../../shared/types';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, changePassword, logout } = useAuth();
  const navigate = useNavigate();

  // Profile fields state
  const [name, setName] = useState(user?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Change password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhoneNumber(user.phoneNumber || '');
      setAvatarUrl(user.avatarUrl || '');
    }
  }, [user]);

  // Password strength calculation
  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasLowercase = /[a-z]/.test(newPassword);
  const hasSpecialOrDigit = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword);
  const strengthScore = [hasMinLength, hasUppercase, hasLowercase, hasSpecialOrDigit].filter(Boolean).length;

  const getStrengthMeta = () => {
    if (!newPassword) return { label: 'None', color: 'bg-gray-200', text: 'text-gray-400' };
    if (strengthScore <= 2) return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-600' };
    if (strengthScore === 3) return { label: 'Medium', color: 'bg-amber-500', text: 'text-amber-600' };
    return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-600' };
  };

  const strengthMeta = getStrengthMeta();

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg(null);
    setProfileLoading(true);

    try {
      await updateProfile({
        name: name.trim(),
        phoneNumber: phoneNumber.trim(),
        avatarUrl: avatarUrl.trim() || undefined,
      });
      setProfileMsg({ type: 'success', text: 'Profile information updated successfully.' });
    } catch (err: any) {
      setProfileMsg({
        type: 'error',
        text: err.response?.data?.message || err.message || 'Failed to update profile.',
      });
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (!currentPassword) {
      setPasswordMsg({ type: 'error', text: 'Please enter your current password.' });
      return;
    }

    if (!hasMinLength || !hasUppercase || !hasLowercase || !hasSpecialOrDigit) {
      setPasswordMsg({
        type: 'error',
        text: 'New password must be at least 8 characters long and include uppercase, lowercase, and a number or symbol.',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match. Please re-enter.' });
      return;
    }

    setPasswordLoading(true);

    try {
      await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      setPasswordMsg({ type: 'success', text: 'Your password has been changed securely.' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPasswordMsg({
        type: 'error',
        text: err.response?.data?.message || err.message || 'Failed to change password. Please verify current password.',
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  const getRoleDashboardLink = () => {
    switch (user?.role) {
      case UserRole.COLLECTOR:
        return '/collector/dashboard';
      case UserRole.SOCIETY_ADMIN:
        return '/society/dashboard';
      case UserRole.RECYCLER:
        return '/recycler/dashboard';
      case UserRole.MCD_OFFICER:
        return '/municipal/dashboard';
      case UserRole.SUPER_ADMIN:
        return '/admin/dashboard';
      default:
        return '/resident/dashboard';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* Top Profile Hero Card */}
      <div className="bg-gradient-to-r from-forest-800 to-forest-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400/40 flex items-center justify-center text-white text-2xl font-black shadow-inner overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-10 h-10 text-emerald-300" />
              )}
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 bg-emerald-500 text-white p-1 rounded-full border-2 border-forest-900 shadow-sm" title="Verified Account">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-white">{user?.name || 'Citizen User'}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                {user?.role?.replace('_', ' ') || 'RESIDENT'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-white border border-white/20">
                Status: ACTIVE
              </span>
            </div>
            <p className="text-xs text-emerald-200/90 font-mono">{user?.email}</p>
            <p className="text-xs text-emerald-300/80">EcoSetu Decentralized Municipal Waste Grid Participant</p>
          </div>
        </div>

        <div className="flex sm:flex-col items-center gap-2">
          <Link
            to={getRoleDashboardLink()}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs rounded-xl shadow-md transition-all whitespace-nowrap"
          >
            Go to My Portal
          </Link>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="px-4 py-2 bg-white/10 hover:bg-rose-500/20 text-white hover:text-rose-200 border border-white/20 hover:border-rose-400/40 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Grid: Profile Details + Change Password */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form 1: Profile Information */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <User className="w-5 h-5 text-emerald-600" />
            <h2 className="text-sm font-extrabold text-gray-900">Personal Information</h2>
          </div>

          {profileMsg && (
            <div
              className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                profileMsg.type === 'success'
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                  : 'bg-rose-50 border border-rose-200 text-rose-700'
              }`}
            >
              {profileMsg.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-600" />
              )}
              <span>{profileMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address (Read-only)</label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full px-3.5 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-xs text-gray-500 cursor-not-allowed font-mono"
              />
              <span className="text-[10px] text-gray-400 mt-1 block">
                Email address is tied to your cryptographic session credentials.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Participant Role (Read-only)</label>
              <input
                type="text"
                disabled
                value={user?.role || 'RESIDENT'}
                className="w-full px-3.5 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-xs text-gray-500 cursor-not-allowed font-bold"
              />
              <span className="text-[10px] text-gray-400 mt-1 block">
                Privileged role elevation requires municipal administration authorization.
              </span>
            </div>

            <button
              type="submit"
              disabled={profileLoading}
              className="w-full py-2.5 bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {profileLoading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Profile Changes
                </>
              )}
            </button>
          </form>
        </div>

        {/* Form 2: Change Password */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Lock className="w-5 h-5 text-emerald-600" />
            <h2 className="text-sm font-extrabold text-gray-900">Security & Credentials</h2>
          </div>

          {passwordMsg && (
            <div
              className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                passwordMsg.type === 'success'
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                  : 'bg-rose-50 border border-rose-200 text-rose-700'
              }`}
            >
              {passwordMsg.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-600" />
              )}
              <span>{passwordMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full pl-3.5 pr-10 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 8 chars, 1 uppercase, 1 symbol"
                  className="w-full pl-3.5 pr-10 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                  className="w-full pl-3.5 pr-10 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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

            {/* Strength meter */}
            {newPassword && (
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">New Password Strength:</span>
                  <span className={`font-bold ${strengthMeta.text}`}>{strengthMeta.label}</span>
                </div>
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden flex gap-1">
                  <div
                    className={`h-full transition-all duration-300 ${strengthMeta.color}`}
                    style={{ width: `${(strengthScore / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={passwordLoading}
              className="w-full py-2.5 bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {passwordLoading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  Update Security Password
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
