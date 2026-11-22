import React from 'react';
import { Layers, QrCode, Camera, Coins, ShoppingBag, ShieldCheck } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Physical Segregation in 1 Dustbin',
      icon: Layers,
      color: 'bg-emerald-100 text-emerald-800',
      description:
        'Instead of forcing households to buy multiple bulky dustbins, SwachhSetu introduces a divided bag with separate green and blue sections fitting standard home bins, supplemented by red sanitary and yellow hazardous add-ons.',
    },
    {
      step: '02',
      title: 'Doorstep Collection & QR Handshake',
      icon: QrCode,
      color: 'bg-blue-100 text-blue-800',
      description:
        'Every resident has a unique Household ID (e.g. HH-DL-WZ1-0042) and scannable QR badge outside their door. The authorized collector scans the code to establish verifiable custody.',
    },
    {
      step: '03',
      title: 'Geo-Tagged Photo & Weight Capture',
      icon: Camera,
      color: 'bg-purple-100 text-purple-800',
      description:
        'The collector weighs the streams and captures a photographic proof with verified GPS coordinates. Data is dispatched to the backend collection engine.',
    },
    {
      step: '04',
      title: 'FastAPI AI Computer Vision Audit',
      icon: ShieldCheck,
      color: 'bg-teal-100 text-teal-800',
      description:
        'Our independent Python AI service classifies the image into wet, dry, sanitary, and special-care streams. It flags foreign items or contamination. High-confidence collections receive automatic verification.',
    },
    {
      step: '05',
      title: 'Green Credit Ledger Rewards',
      icon: Coins,
      color: 'bg-amber-100 text-amber-800',
      description:
        'A transactional double-entry ledger mints green credits to the household. Residents redeem credits for organic compost bags, biodegradable bin liners, or municipal property tax rebates.',
    },
    {
      step: '06',
      title: 'B2B Recycler Marketplace & Circular Sale',
      icon: ShoppingBag,
      color: 'bg-rose-100 text-rose-800',
      description:
        'Societies compress clean dry recyclables (PET bottles, cardboard, metals) into high-purity bales and list them on the B2B marketplace. Authorized CPCB recyclers purchase lots with official manifests.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          The Circular Life-Cycle
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          How SwachhSetu Works
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          From the household kitchen counter to the recycling plant: Traceable, verified, and rewarded.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.step} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 hover:shadow-card-hover transition-all">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-gray-300 font-mono">{s.step}</span>
                <div className={`p-3 rounded-xl ${s.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-base">{s.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{s.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

