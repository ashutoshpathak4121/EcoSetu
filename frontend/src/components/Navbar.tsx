import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Recycle, Menu, X, User, LogOut, LayoutDashboard, ArrowRight } from 'lucide-react';
import { UserRole } from '../../../shared/types';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const getDashboardRoute = (role?: UserRole) => {
    switch (role) {
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
      case UserRole.RESIDENT:
      default:
        return '/resident/dashboard';
    }
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: '4-Stream Guide', href: '/segregation-guide' },
    { label: 'Our Impact', href: '/impact' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-8 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-forest-800 text-white flex items-center justify-center shadow-md group-hover:bg-forest-700 transition-colors">
              <Recycle className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-forest-900 block leading-tight">
                SwachhSetu
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 block">
                WasteChakra Eco-Grid
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="hover:text-forest-700 transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User actions */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to={getDashboardRoute(user.role)}
                  className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-forest-50 hover:bg-forest-100 text-forest-800 text-sm font-semibold transition-colors border border-forest-200"
                >
                  <LayoutDashboard className="w-4 h-4 text-forest-600" />
                  <span>My Portal</span>
                </Link>

                <div className="flex items-center space-x-2 pl-2 border-l border-gray-200">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    {user.name?.charAt(0) || 'U'}
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    title="Log out"
                    className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-forest-700 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl bg-forest-800 hover:bg-forest-700 text-white text-sm font-semibold transition-colors shadow-sm"
                >
                  Join SwachhSetu
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-forest-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-gray-100">
            {isAuthenticated && user ? (
              <div className="space-y-2">
                <Link
                  to={getDashboardRoute(user.role)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-xl bg-forest-800 text-white font-semibold"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Go to My Portal</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    navigate('/');
                  }}
                  className="w-full py-2 text-center text-sm font-semibold text-rose-600"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center rounded-xl border border-gray-300 font-semibold text-gray-700"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center rounded-xl bg-forest-800 text-white font-semibold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
