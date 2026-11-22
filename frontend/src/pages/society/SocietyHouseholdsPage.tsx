import React, { useState } from 'react';
import { StatusBadge } from '../../components/StatusBadge';
import { Users, QrCode, Search, Award, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const SocietyHouseholdsPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const residentDirectory = [
    {
      flat: 'A-101',
      block: 'Block A',
      resident: 'Pooja Verma',
      householdId: 'HH-DL-WZ1-0042',
      compliance: 98.4,
      status: 'VERIFIED',
      credits: 145,
    },
    {
      flat: 'A-204',
      block: 'Block A',
      resident: 'Rohan Sharma',
      householdId: 'HH-DL-WZ1-0051',
      compliance: 94.2,
      status: 'VERIFIED',
      credits: 110,
    },
    {
      flat: 'C-501',
      block: 'Block C',
      resident: 'Sunita Mehra',
      householdId: 'HH-DL-WZ1-0078',
      compliance: 99.1,
      status: 'VERIFIED',
      credits: 240,
    },
    {
      flat: 'D-302',
      block: 'Block D',
      resident: 'Kabir Batra',
      householdId: 'HH-DL-WZ1-0112',
      compliance: 88.0,
      status: 'NEEDS_SPOT_CHECK',
      credits: 65,
    },
    {
      flat: 'B-105',
      block: 'Block B',
      resident: 'Pooja Gupta',
      householdId: 'HH-DL-WZ1-0033',
      compliance: 96.5,
      status: 'VERIFIED',
      credits: 180,
    },
  ];

  const filtered = residentDirectory.filter(
    (r) =>
      r.flat.toLowerCase().includes(search.toLowerCase()) ||
      r.resident.toLowerCase().includes(search.toLowerCase()) ||
      r.householdId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Society Resident Directory</h1>
          <p className="text-xs text-gray-500">Registered flats in Green Meadows Residency RWA • Monitored for 4-stream compliance</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search flat, name, ID..."
            className="w-full pl-9 pr-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-xs font-bold text-gray-700">
          <span>Apartment Unit & Resident</span>
          <span>Compliance & Credits</span>
        </div>

        <div className="divide-y divide-gray-100">
          {filtered.map((item) => (
            <div key={item.flat} className="p-4 flex flex-wrap items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors text-xs">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-extrabold text-indigo-900 text-sm">{item.flat}</span>
                  <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-semibold">{item.block}</span>
                  <StatusBadge status={item.status} size="sm" />
                </div>
                <div className="font-semibold text-gray-800">{item.resident}</div>
                <div className="text-[11px] font-mono text-gray-500">{item.householdId}</div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <span className="text-xs font-bold text-gray-900 block">{item.compliance}% Segregation</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">{item.credits} Green Credits</span>
                </div>

                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-200" title="QR Code Verified">
                  <QrCode className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
