import React, { useState } from 'react';
import { WasteStreamCard } from '../components/WasteStreamCard';
import { WasteStream } from '../../../shared/types';
import { Search, Info, HelpCircle } from 'lucide-react';

const COMMON_ITEMS = [
  { name: 'Vegetable & Fruit Peels', stream: WasteStream.WET, bin: 'Green Section', notes: 'Drain water before disposal.' },
  { name: 'Cooked Food Leftovers', stream: WasteStream.WET, bin: 'Green Section', notes: 'No plastic wraps or aluminum foil.' },
  { name: 'Tea Leaves & Coffee Grounds', stream: WasteStream.WET, bin: 'Green Section', notes: 'Remove staples from tea bags.' },
  { name: 'PET Water & Soda Bottles', stream: WasteStream.DRY, bin: 'Blue Section', notes: 'Rinse, empty, and crush.' },
  { name: 'Milk Pouches', stream: WasteStream.DRY, bin: 'Blue Section', notes: 'Snip edge without detaching bit, rinse and dry.' },
  { name: 'Cardboard Delivery Boxes', stream: WasteStream.DRY, bin: 'Blue Section', notes: 'Flatten completely to save space.' },
  { name: 'Aluminum Cans & Metal Tins', stream: WasteStream.DRY, bin: 'Blue Section', notes: 'Rinse clean.' },
  { name: 'Sanitary Pads & Napkins', stream: WasteStream.SANITARY, bin: 'Red Pouch', notes: 'Wrap in paper, mark prominent RED DOT.' },
  { name: 'Baby & Adult Diapers', stream: WasteStream.SANITARY, bin: 'Red Pouch', notes: 'Roll securely, wrap with red mark.' },
  { name: 'Discarded Medical Bandages', stream: WasteStream.SANITARY, bin: 'Red Pouch', notes: 'Wrap securely in newspaper/paper.' },
  { name: 'AA / AAA / Lithium Batteries', stream: WasteStream.SPECIAL_CARE, bin: 'Yellow Box', notes: 'Do not throw in general bin.' },
  { name: 'CFL Bulbs & Fluorescent Tubes', stream: WasteStream.SPECIAL_CARE, bin: 'Yellow Box', notes: 'Do not break glass; mercury hazard.' },
  { name: 'Old Phone Chargers & Wires', stream: WasteStream.SPECIAL_CARE, bin: 'Yellow Box', notes: 'Keep in domestic e-waste bin.' },
  { name: 'Blister Packs & Expired Medicines', stream: WasteStream.SPECIAL_CARE, bin: 'Yellow Box', notes: 'Return to pharmacy or yellow TSDF bin.' },
];

export const SegregationGuidePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = COMMON_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Source Segregation Bible
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Four-Stream Waste Segregation Guide
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          The ultimate reference for households, RWAs, and collectors across Indian cities.
        </p>
      </div>

      {/* Item Lookup Search */}
      <div className="max-w-xl mx-auto">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search any household item (e.g. milk pouch, battery, diaper, tea leaves)..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
        </div>

        {searchQuery && (
          <div className="mt-3 bg-white border border-gray-200 rounded-xl shadow-lg p-3 divide-y divide-gray-100 max-h-72 overflow-y-auto">
            {filteredItems.length === 0 ? (
              <div className="text-center py-4 text-xs text-gray-500">
                No matching item found. When in doubt, categorize by material: Organic (Green) vs Packaging (Blue).
              </div>
            ) : (
              filteredItems.map((item, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">{item.name}</span>
                    <span className="text-gray-500 text-[11px]">{item.notes}</span>
                  </div>
                  <span
                    className={`font-semibold px-2.5 py-1 rounded-full border ${
                      item.stream === WasteStream.WET
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : item.stream === WasteStream.DRY
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : item.stream === WasteStream.SANITARY
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {item.bin}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* All 4 Stream Cards Detailed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WasteStreamCard stream={WasteStream.WET} detailed={true} />
        <WasteStreamCard stream={WasteStream.DRY} detailed={true} />
        <WasteStreamCard stream={WasteStream.SANITARY} detailed={true} />
        <WasteStreamCard stream={WasteStream.SPECIAL_CARE} detailed={true} />
      </div>

      {/* The Physical Divided Bag Callout */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="p-4 bg-emerald-600 text-white rounded-2xl shadow-md">
          <Info className="w-8 h-8" />
        </div>
        <div className="space-y-1 text-center sm:text-left text-xs sm:text-sm text-gray-700">
          <h3 className="font-bold text-lg text-emerald-950">Why the Divided Bag is a Breakthrough</h3>
          <p className="leading-relaxed">
            In compact Indian flats and apartments, having 3 or 4 separate dustbins takes up excessive kitchen floor space.
            SwachhSetu’s divided bag uses one regular circular or rectangular bin and splits it internally into Wet and Dry partitions.
            Sanitary and hazardous pouches hang securely on the side. Simple, clean, and space-saving.
          </p>
        </div>
      </div>
    </div>
  );
};

