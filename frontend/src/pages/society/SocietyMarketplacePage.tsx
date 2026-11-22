import React, { useEffect, useState } from 'react';
import { marketplaceApi } from '../../services/marketplace.api';
import { WasteStream } from '../../../../shared/types';
import { Plus, ShoppingBag, Scale, Award, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const SocietyMarketplacePage: React.FC = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    category: WasteStream.DRY,
    subType: 'Baled PET Bottles (Clean & Flaked)',
    quantityKg: '350',
    minimumBidPerKg: '32.0',
    purityGrade: 'A_PLUS' as 'A_PLUS' | 'A' | 'B' | 'STANDARD',
    notes: 'Segregated from 140 flats using divided bags. Moisture < 2%.',
  });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await marketplaceApi.getListings();
        setListings(data || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchListings();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newListing = await marketplaceApi.createListing({
        category: formData.category,
        subType: formData.subType,
        quantityKg: parseFloat(formData.quantityKg) || 100,
        minimumBidPerKg: parseFloat(formData.minimumBidPerKg) || 10,
        purityGrade: formData.purityGrade,
        pickupAddress: 'Gate 2, Green Meadows Residency, Mayur Vihar Phase 1',
        localityName: 'Mayur Vihar Phase 1 (Ward 42)',
        notes: formData.notes,
      });

      setListings([newListing, ...listings]);
      setShowModal(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to publish listing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Society Waste Marketplace Lots</h1>
          <p className="text-xs text-gray-500">Sell segregated, baled recyclables directly to authorized CPCB industrial buyers</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-forest-800 hover:bg-forest-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          Create New Recyclable Lot
        </button>
      </div>

      {/* Modal for creating lot */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white text-gray-900 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-900 text-base">List Recyclable Waste Lot</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700 text-sm font-bold">
                ✕
              </button>
            </div>

            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Waste Stream Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 font-medium focus:ring-2 focus:ring-indigo-500"
                >
                  <option value={WasteStream.DRY}>🔵 Dry Recyclables (Plastics/Cardboard/Metals)</option>
                  <option value={WasteStream.WET}>🟢 Organic Vermicompost / Bio-Cake</option>
                  <option value={WasteStream.SPECIAL_CARE}>🟡 Segregated Domestic E-Waste</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Material Specification</label>
                <input
                  type="text"
                  required
                  value={formData.subType}
                  onChange={(e) => setFormData({ ...formData, subType: e.target.value })}
                  placeholder="e.g. Baled PET Bottles (Clean & Flaked)"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 font-medium placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Total Quantity (Kg)</label>
                  <input
                    type="number"
                    required
                    value={formData.quantityKg}
                    onChange={(e) => setFormData({ ...formData, quantityKg: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg font-bold text-gray-900 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Reserve Price (₹ / Kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={formData.minimumBidPerKg}
                    onChange={(e) => setFormData({ ...formData, minimumBidPerKg: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg font-bold text-gray-900 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Purity Grade</label>
                  <select
                    value={formData.purityGrade}
                    onChange={(e) => setFormData({ ...formData, purityGrade: e.target.value as any })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 font-medium focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="A_PLUS">Grade A+ (Zero Moisture, Pure)</option>
                    <option value="A">Grade A (High Commercial Grade)</option>
                    <option value="B">Grade B (Standard Recyclable)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Lot Available Date</label>
                  <input
                    type="text"
                    disabled
                    value="Immediate Dispatch"
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Baling & Storage Notes</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 font-medium placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-xl font-bold shadow-md disabled:opacity-50"
                >
                  {loading ? 'Publishing Lot...' : 'Publish to Recyclers'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Listings grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map((l) => (
          <div key={l.id} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-gray-900">{l.listingCode || 'LOT-2026-001'}</span>
                <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {l.status}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-sm leading-tight">{l.subType}</h3>
              <p className="text-xs text-gray-500 line-clamp-2">{l.notes}</p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-gray-400 text-[10px] block">Quantity</span>
                <span className="font-extrabold text-gray-900">{l.quantityKg} Kg</span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] block">Reserve Bid</span>
                <span className="font-extrabold text-emerald-700">₹{l.minimumBidPerKg} / Kg</span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] block">Purity</span>
                <span className="font-extrabold text-indigo-700">{l.purityGrade}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
