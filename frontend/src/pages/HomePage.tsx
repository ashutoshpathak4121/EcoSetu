import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { WasteStreamCard } from '../components/WasteStreamCard';
import { WasteStream } from '../../../shared/types';
import {
  Recycle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Truck,
  Building,
  Coins,
  Cpu,
  Layers,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<WasteStream>(WasteStream.WET);

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

      {/* 2. Civic Impact Live Counters */}
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
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center">
                1
              </div>
              <h3 className="font-bold text-gray-900 text-base">Household Segregation</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Residents sort waste into the divided bag and add-on pouches. Each home has a unique QR Household ID outside their door.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 font-extrabold flex items-center justify-center">
                2
              </div>
              <h3 className="font-bold text-gray-900 text-base">Geo-Tagged Collection</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                MCD sanitation collectors scan the household QR, weigh the streams, and capture geo-tagged photographic evidence.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 font-extrabold flex items-center justify-center">
                3
              </div>
              <h3 className="font-bold text-gray-900 text-base">FastAPI AI Verification</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Computer vision models verify purity scores, detect contamination, and credit Green Credits into the resident's ledger wallet.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-extrabold flex items-center justify-center">
                4
              </div>
              <h3 className="font-bold text-gray-900 text-base">Recycler Marketplace</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Societies aggregate pure recyclables into bales and sell directly to authorized CPCB recyclers through digital escrow orders.
              </p>
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

