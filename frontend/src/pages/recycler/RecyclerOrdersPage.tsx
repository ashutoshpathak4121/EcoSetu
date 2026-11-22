import React from 'react';
import { StatusBadge } from '../../components/StatusBadge';
import { FileText, Scale, CheckCircle2, Truck, ExternalLink } from 'lucide-react';

export const RecyclerOrdersPage: React.FC = () => {
  const orders = [
    {
      id: 'ord-01',
      orderNumber: 'ORD-2026-11-0089',
      material: 'Baled PET Bottles (Clean & Flaked)',
      society: 'Green Meadows Residency RWA',
      quantityKg: 350,
      agreedRate: 34.0,
      totalAmount: 11900,
      manifestCode: 'DL-MCD-WM-2026-9812-B',
      status: 'WEIGHBRIDGE_VERIFIED',
      paymentStatus: 'ESCROW_HOLD',
      date: '2026-11-20',
      weighbridgeSlip: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400',
    },
    {
      id: 'ord-02',
      orderNumber: 'ORD-2026-11-0072',
      material: 'Sorted Corrugated Cardboard Bales',
      society: 'Aravali Heights Cooperative Housing',
      quantityKg: 600,
      agreedRate: 14.5,
      totalAmount: 8700,
      manifestCode: 'DL-MCD-WM-2026-8940-A',
      status: 'COMPLETED',
      paymentStatus: 'RELEASED',
      date: '2026-11-14',
      weighbridgeSlip: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Procurement Orders & Manifests</h1>
        <p className="text-xs text-zinc-400">
          Official weighbridge verified receipts and CPCB digital waste transport manifests
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((ord) => (
          <div key={ord.id} className="bg-white text-gray-900 rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-gray-900 text-sm">{ord.orderNumber}</span>
                  <StatusBadge status={ord.status} />
                </div>
                <h3 className="font-bold text-gray-800 text-base">{ord.material}</h3>
                <span className="text-xs text-gray-500">Seller: {ord.society}</span>
              </div>

              <div className="text-right">
                <span className="text-xl font-extrabold text-gray-900 block">₹{ord.totalAmount.toLocaleString()}</span>
                <span className="text-xs text-emerald-700 font-semibold block">{ord.quantityKg} kg @ ₹{ord.agreedRate}/kg</span>
                <span className="text-[10px] font-mono text-gray-400">Escrow: {ord.paymentStatus}</span>
              </div>
            </div>

            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-amber-600" />
                <span className="text-gray-600">Digital Manifest Code:</span>
                <span className="font-mono font-bold text-gray-900">{ord.manifestCode}</span>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-gray-400 text-[11px]">{ord.date}</span>
                <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Weighbridge Certified
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
