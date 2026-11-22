import React, { useState } from 'react';
import { Users, QrCode, ShieldCheck, Search, Plus } from 'lucide-react';

export const SocietyHouseholdsPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const residentDirectory = [
    {
      flat: 'B-402',
      block: 'Block B',
      resident: 'Aarav Sharma',
      householdId: 'HH-DL-WZ1-0042',
      compliance: 98.4,
      status: 'VERIFIED',
      credits: 145,
    },
    {
      flat: 'A-101',
      block: 'Block A',
      resident: 'Deepak Verma',
      householdId: 'HH-DL-WZ1-0019',
      compliance: 94.2,
      status: 'VERIFIED',
      credits: 110,
    },
    {
      flat: 'C-204',
      block: 'Block C',
      resident: 'Meenakshi Iyer',
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
          <p className="text-xs text-gray-500">Registered flats in Gulmohar Enclave RWA • Monitored for 4-stream compliance</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search flat or resident..."
            className="w-full pl-9 pr-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {filtered.map((item) => (
            <div key={item.householdId} className="p-4 flex flex-wrap items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors text-xs">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 font-extrabold flex items-center justify-center">
                  {item.flat}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{item.resident}</div>
                  <div className="text-[11px] text-gray-400 font-mono">
                    {item.householdId} • {item.block}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Purity Score</span>
                  <span className="font-black text-emerald-700 text-xs">{item.compliance}%</span>
                </div>

                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Credits</span>
                  <span className="font-bold text-gray-900 text-xs">{item.credits}</span>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${
                    item.status === 'VERIFIED'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  {item.status.replace(/_/g, ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

