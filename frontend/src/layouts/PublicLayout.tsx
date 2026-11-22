import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { DemoRoleSwitcher } from '../components/DemoRoleSwitcher';
import { Recycle, Heart, Shield } from 'lucide-react';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9]">
      <DemoRoleSwitcher />
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-forest-900 text-gray-300 pt-12 pb-8 border-t border-forest-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 p-1 flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <img src="/logo-icon.png" alt="EcoSetu Emblem" className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="font-extrabold text-lg text-white block leading-tight">EcoSetu</span>
                  <span className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider block">WasteChakra Eco-Grid</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Bridge to Cleanliness — Transforming urban Indian waste management through 4-stream source segregation, computer vision verification, and circular economy rewards.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Waste Streams</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>🟢 Wet Waste (Green Compartment)</li>
                <li>🔵 Dry Recyclables (Blue Compartment)</li>
                <li>🔴 Sanitary Waste (Red Add-on Bag)</li>
                <li>🟡 Special-Care (Yellow TSDF Box)</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Stakeholders</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>Residents & Households</li>
                <li>Doorstep Waste Collectors</li>
                <li>RWA & Society Admins</li>
                <li>Authorized Recyclers & B2B Buyers</li>
                <li>Municipal Corporation of Delhi (MCD)</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Techathon 2026</h4>
              <p className="text-xs text-gray-400 leading-relaxed mb-2">
                Architected and developed by <strong>Ashutosh Pathak</strong> for Techathon 2026.
              </p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-forest-800 text-emerald-300 text-xs border border-forest-700">
                <Shield className="w-3.5 h-3.5" />
                WasteChakra Circular Economy
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-forest-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
            <div>&copy; {new Date().getFullYear()} EcoSetu. Built for sustainable Indian cities.</div>
            <div className="mt-2 sm:mt-0 flex items-center gap-1">
              Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> by Ashutosh Pathak
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

