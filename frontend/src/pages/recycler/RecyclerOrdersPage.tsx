import React from 'react';
import { StatusBadge } from '../../components/StatusBadge';
import { FileText, Scale, CheckCircle2, Truck, ExternalLink } from 'lucide-react';

export const RecyclerOrdersPage: React.FC = () => {
  const orders = [
    {
      id: 'ord-01',
      orderNumber: 'ORD-2026-11-0089',
      material: 'Baled PET Bottles (Clean & Flaked)',
      society: 'Gulmohar Enclave RWA',
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
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Procurement Orders & Manifests</h1>
        <p className="text-xs text-gray-500">
          Official weighbridge verified receipts and CPCB digital waste transport manifests
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((ord) => (
          <div key={ord.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
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
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {ord.paymentStatus}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs">
              <div>
                <span className="text-gray-400 block text-[10px]">Quantity</span>
                <span className="font-bold text-gray-900">{ord.quantityKg} kg</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Agreed Price</span>
                <span className="font-bold text-gray-900">₹{ord.agreedRate} / kg</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Order Date</span>
                <span className="font-bold text-gray-900">{ord.date}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">CPCB Manifest No</span>
                <span className="font-mono font-bold text-blue-700">{ord.manifestCode}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                Weighbridge Weight Confirmed (Electronic Zero Drift)
              </span>
              <a
                href={ord.weighbridgeSlip}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-forest-800 hover:underline flex items-center gap-1"
              >
                View Weighbridge Slip
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

