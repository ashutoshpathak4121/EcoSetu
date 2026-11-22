import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WasteStreamCard } from '../components/WasteStreamCard';
import { WasteStream, UserRole } from '../../../shared/types';
import { useAuth } from '../context/AuthContext';
import {
  Recycle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Truck,
  Building,
  Building2,
  Coins,
  Cpu,
  Layers,
  ChevronRight,
  TrendingUp,
  Home,
  Factory,
  Landmark,
  Shield,
  QrCode,
  Radio,
  ExternalLink,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<WasteStream>(WasteStream.WET);
  const { switchDemoRole } = useAuth();
  const navigate = useNavigate();

  const handlePortalLaunch = async (role: UserRole, targetPath: string) => {
    try {
      await switchDemoRole(role);
    } catch (e) {
      console.error('Portal launch failed', e);
    } finally {
      navigate(targetPath);
    }
  };

  const portalCards = [
    {
      role: UserRole.RESIDENT,
      title: 'Resident Household Portal',
      badge: 'Household Hub',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: Home,
      iconBg: 'bg-emerald-100 text-emerald-800',
      path: '/resident/dashboard',
      description: 'Household source segregation hub with doorstep QR badges and rewards.',
      features: ['Doorstep Household QR Identification', 'FastAPI Computer Vision Waste Scanner', 'Green Credits Wallet & Local Rewards'],
      btnColor: 'bg-emerald-700 hover:bg-emerald-800 text-white',
    },
    {
      role: UserRole.COLLECTOR,
      title: 'Sanitation Collector Beat',
      badge: 'Field Operations',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: Truck,
      iconBg: 'bg-blue-100 text-blue-800',
      path: '/collector/dashboard',
      description: 'Driver and worker mobile console for daily collection beats and verified pick-ups.',
      features: ['Ward 42 Doorstep Route & Household Tasks', 'Live GIS Beat Navigation & Geo-tagging', 'Digital Weighbridge & Photographic Evidence'],
      btnColor: 'bg-blue-700 hover:bg-blue-800 text-white',
    },
    {
      role: UserRole.SOCIETY_ADMIN,
      title: 'Society RWA Administration',
      badge: 'Apartment RWA',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: Building2,
      iconBg: 'bg-purple-100 text-purple-800',
      path: '/society/dashboard',
      description: 'Community compliance management for residential societies and apartments.',
      features: ['140 Flats Segregation Directory', 'Ward Cleanliness Compliance Scores', 'Aggregated Recyclables B2B Auction'],
      btnColor: 'bg-purple-700 hover:bg-purple-800 text-white',
    },
    {
      role: UserRole.RECYCLER,
      title: 'Recycler B2B Exchange',
      badge: 'CPCB Authorized',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: Factory,
      iconBg: 'bg-amber-100 text-amber-800',
      path: '/recycler/dashboard',
      description: 'Transparent marketplace for certified recyclers to purchase sorted baled lots.',
      features: ['Real-time Scrap Lot Procurement Bidding', 'Automated CPCB Transport Manifests', 'Digital Escrow Payment Settlement'],
      btnColor: 'bg-amber-600 hover:bg-amber-700 text-white',
    },
    {
      role: UserRole.MCD_OFFICER,
      title: 'MCD Municipal Command Grid',
      badge: 'East Delhi Ward 42',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      icon: Landmark,
      iconBg: 'bg-rose-100 text-rose-800',
      path: '/municipal/dashboard',
      description: 'Municipal Corporation of Delhi central operations and civic telemetry control room.',
      features: ['Ward 42 Daily Tonnage & Purity Telemetry', '14 Electric Vehicle GPS Fleet Map', 'Human-in-the-Loop AI Evidence Audit Queue'],
      btnColor: 'bg-rose-700 hover:bg-rose-800 text-white',
    },
    {
      role: UserRole.SUPER_ADMIN,
      title: 'Super Admin System Governance',
      badge: 'Core Platform',
      badgeColor: 'bg-gray-200 text-gray-800 border-gray-300',
      icon: ShieldCheck,
      iconBg: 'bg-gray-100 text-gray-900',
      path: '/admin/dashboard',
      description: 'Master platform configuration, user RBAC roles, and cryptographic ledgers.',
      features: ['Multi-stakeholder Access Control (RBAC)', 'Prisma ORM & PostgreSQL Integrity', 'Immutable Blockchain Credit Audit Trails'],
      btnColor: 'bg-gray-900 hover:bg-gray-800 text-white',
    },
  ];

  const streams = [
    { stream: WasteStream.WET, label: '🟢 Wet Waste', color: 'border-emerald-500 text-emerald-700' },
    { stream: WasteStream.DRY, label: '🔵 Dry Recyclables', color: 'border-blue-500 text-blue-700' },
    { stream: WasteStream.SANITARY, label: '🔴 Sanitary Waste', color: 'border-rose-500 text-rose-700' },
    { stream: WasteStream.SPECIAL_CARE, label: '🟡 Special-Care / Hazardous', color: 'border-amber-500 text-amber-700' },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 bg-gradient-to-b from-emerald-50/60 via-white to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-forest-800 text-xs font-bold tracking-wide">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Ashutosh Pathak • WasteChakra Civic Initiative
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
                Segregate at Source. <br />
                <span className="text-forest-700">Track Every Collection.</span> <br />
                Build a Circular Economy.
              </h1>

              <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
                EcoSetu bridges households, collectors, RWAs, and authorized recyclers. Powered by our <strong>dual-compartment physical divided bag</strong>, <strong>FastAPI computer vision verification</strong>, and an <strong>immutable green credit ledger</strong>.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Link
                  to="/register"
                  className="px-6 py-3.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  Onboard Your Household
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/how-it-works"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-bold text-sm transition-all shadow-sm"
                >
                  Explore WasteChakra Model
                </Link>
              </div>

              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-gray-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  MCD Ward Integration
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Computer Vision Audits
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  B2B Recycler Market
                </div>
              </div>
            </div>

            {/* Hero Right Visual: The Physical Divided Bag Innovation */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white border border-gray-200 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-100 rounded-lg text-forest-800">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">The Physical Solution</h3>
                      <span className="text-xs text-gray-500">1 Regular Dustbin + Divided Bag</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold rounded-full">
                    WasteChakra Patented
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Dustbin container illustration */}
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="font-bold text-gray-800 mb-2 flex items-center justify-between">
                      <span>Household Dustbin Interior</span>
                      <span className="text-gray-400 font-normal">Standard 15L - 25L</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center font-bold">
                      <div className="bg-emerald-100 border-2 border-emerald-500 p-4 rounded-lg text-emerald-900">
                        <div className="text-sm">GREEN COMPARTMENT</div>
                        <div className="text-[10px] text-emerald-700 font-normal mt-1">Wet Organic Waste Scraps</div>
                      </div>
                      <div className="bg-blue-100 border-2 border-blue-500 p-4 rounded-lg text-blue-900">
                        <div className="text-sm">BLUE COMPARTMENT</div>
                        <div className="text-[10px] text-blue-700 font-normal mt-1">Dry Recyclable Packaging</div>
                      </div>
                    </div>
                  </div>

                  {/* Add-on arrangements */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-900">
                      <div className="font-bold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                        Red Dot Add-on Pouch
                      </div>
                      <div className="text-[10px] text-rose-700 mt-0.5">Sanitary diapers & pads</div>
                    </div>
                    <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-900">
                      <div className="font-bold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                        Yellow Safe-Box Add-on
                      </div>
                      <div className="text-[10px] text-amber-700 mt-0.5">Batteries & domestic e-waste</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>Household Segregation Compliance</span>
                  <span className="font-extrabold text-emerald-700">98.4% (Ward 203)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive 6 Stakeholder Portals Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Live Stakeholder Ecosystem
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Explore All 6 Connected EcoSetu Portals
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Click any portal below to launch the live interactive console with instant 1-click evaluation access.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portalCards.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.role}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-5 group hover:border-emerald-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl ${p.iconBg}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${p.badgeColor}`}>
                      {p.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-lg text-gray-900 group-hover:text-forest-800 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <ul className="space-y-1.5 text-xs text-gray-600 pt-1 border-t border-gray-100">
                    {p.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handlePortalLaunch(p.role, p.path)}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all ${p.btnColor}`}
                >
                  <span>Open {p.title.split(' ')[0]} Portal</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Civic Impact Live Counters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-900 text-white rounded-2xl p-8 sm:p-12 shadow-xl border border-forest-800">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Real-Time Civic & Environmental Impact
            </h2>
            <p className="text-xs sm:text-sm text-gray-300">
              Aggregated across 48 registered RWAs and East Delhi Municipal Wards.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-forest-800/60 border border-forest-700/50">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">12.45 MT</div>
              <div className="text-xs text-gray-300 font-semibold mt-1">Daily Landfill Diversion</div>
            </div>
            <div className="p-4 rounded-xl bg-forest-800/60 border border-forest-700/50">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">94.2%</div>
              <div className="text-xs text-gray-300 font-semibold mt-1">Source Compliance Rate</div>
            </div>
            <div className="p-4 rounded-xl bg-forest-800/60 border border-forest-700/50">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">1,480+</div>
              <div className="text-xs text-gray-300 font-semibold mt-1">Registered Households</div>
            </div>
            <div className="p-4 rounded-xl bg-forest-800/60 border border-forest-700/50">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">₹3.8 Lakh</div>
              <div className="text-xs text-gray-300 font-semibold mt-1">Recycler B2B Volume</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 4 Waste Streams Guide Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            The 4-Stream Waste Segregation Architecture
          </h2>
          <p className="text-sm text-gray-600">
            Standardizing household waste sorting to eliminate mixed landfill dumping.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {streams.map((item) => (
            <button
              key={item.stream}
              onClick={() => setActiveTab(item.stream)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                activeTab === item.stream
                  ? 'bg-forest-800 text-white shadow-md'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <WasteStreamCard stream={activeTab} detailed={true} />
        </div>
      </section>

      {/* 4. The Complete End-to-End Circular Loop */}
      <section className="bg-gray-50 py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              How WasteChakra Circular Economy Operates
            </h2>
            <p className="text-sm text-gray-600">
              Traceable accountability at every handover point: From door to recycler weighbridge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div
              onClick={() => handlePortalLaunch(UserRole.RESIDENT, '/resident/dashboard')}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-emerald-400 cursor-pointer transition-all space-y-3 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center group-hover:scale-105 transition-transform">
                  1
                </div>
                <h3 className="font-bold text-gray-900 text-base group-hover:text-emerald-700 transition-colors">
                  Household Segregation
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Residents sort waste into the divided bag and add-on pouches. Each home has a unique QR Household ID outside their door.
                </p>
              </div>
              <div className="pt-2 text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Open Resident Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div
              onClick={() => handlePortalLaunch(UserRole.COLLECTOR, '/collector/dashboard')}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-400 cursor-pointer transition-all space-y-3 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 font-extrabold flex items-center justify-center group-hover:scale-105 transition-transform">
                  2
                </div>
                <h3 className="font-bold text-gray-900 text-base group-hover:text-blue-700 transition-colors">
                  Geo-Tagged Collection
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  MCD sanitation collectors scan the household QR, weigh the streams, and capture geo-tagged photographic evidence.
                </p>
              </div>
              <div className="pt-2 text-xs font-bold text-blue-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Open Collector Beat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div
              onClick={() => handlePortalLaunch(UserRole.RESIDENT, '/resident/ai-verify')}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-purple-400 cursor-pointer transition-all space-y-3 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 font-extrabold flex items-center justify-center group-hover:scale-105 transition-transform">
                  3
                </div>
                <h3 className="font-bold text-gray-900 text-base group-hover:text-purple-700 transition-colors">
                  FastAPI AI Verification
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Computer vision models verify purity scores, detect contamination, and credit Green Credits into the resident's ledger wallet.
                </p>
              </div>
              <div className="pt-2 text-xs font-bold text-purple-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Test AI Scanner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div
              onClick={() => handlePortalLaunch(UserRole.RECYCLER, '/recycler/marketplace')}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-amber-400 cursor-pointer transition-all space-y-3 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-extrabold flex items-center justify-center group-hover:scale-105 transition-transform">
                  4
                </div>
                <h3 className="font-bold text-gray-900 text-base group-hover:text-amber-700 transition-colors">
                  Recycler Marketplace
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Societies aggregate pure recyclables into bales and sell directly to authorized CPCB recyclers through digital escrow orders.
                </p>
              </div>
              <div className="pt-2 text-xs font-bold text-amber-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>View Scrap Marketplace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Call To Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-forest-800 to-forest-900 rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to bring clean, traceable waste segregation to your society?
          </h2>
          <p className="text-sm sm:text-base text-emerald-200 max-w-xl mx-auto leading-relaxed">
            Join hundreds of households earning Green Credits, saving landfill space, and powering a circular India.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              to="/register"
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-sm shadow-md transition-all"
            >
              Register Household
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-xl bg-forest-700/80 hover:bg-forest-700 text-white font-bold text-sm border border-forest-600 transition-all"
            >
              Contact Municipal Liaison
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

