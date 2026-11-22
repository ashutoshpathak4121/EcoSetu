import React, { useEffect, useState } from 'react';
import { marketplaceApi } from '../../services/marketplace.api';
import { StatusBadge } from '../../components/StatusBadge';
import { ShoppingBag, Plus, Tag, Scale, CheckCircle2, AlertCircle } from 'lucide-react';
import { WasteStream } from '../../../../shared/types';

export const SocietyMarketplacePage: React.FC = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    category: WasteStream.DRY,
    subType: 'Baled PET Bottles (Clean & Flaked)',
    quantityKg: '300',
    purityGrade: 'A_PLUS',
    minimumBidPerKg: '32.0',
    pickupAddress: 'Gulmohar Enclave Baler Ramp, Gate 2',
    localityName: 'Mayur Vihar Phase 1, Delhi',
    notes: 'Zero contamination, machine bundled in 25kg bales.',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        purityGrade: formData.purityGrade as any,
        minimumBidPerKg: parseFloat(formData.minimumBidPerKg) || 10,
        pickupAddress: formData.pickupAddress,
        localityName: formData.localityName,
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
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
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
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg"
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
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg"
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
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-bold"
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
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Purity Grade</label>
                  <select
                    value={formData.purityGrade}
                    onChange={(e) => setFormData({ ...formData, purityGrade: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg"
                  >
                    <option value="A_PLUS">Grade A+ (Zero Moisture, Pure)</option>
                    <option value="A">Grade A (High Commercial Grade)</option>
                    <option value="B">Grade B (Standard Recyclable)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Pickup Locality</label>
                  <input
                    type="text"
                    value={formData.localityName}
                    onChange={(e) => setFormData({ ...formData, localityName: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Society Pickup Yard Address</label>
                <input
                  type="text"
                  required
                  value={formData.pickupAddress}
                  onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg font-semibold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-forest-800 text-white font-bold rounded-lg"
                >
                  {loading ? 'Publishing...' : 'Publish to Marketplace'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listings.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-[10px] text-gray-400 font-bold block">{item.listingCode}</span>
                <h3 className="font-bold text-gray-900 text-base">{item.subType}</h3>
                <span className="text-xs text-gray-500">{item.localityName}</span>
              </div>
              <StatusBadge status={item.status} size="sm" />
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs">
              <div>
                <span className="text-gray-400 block text-[10px]">Lot Quantity</span>
                <span className="font-extrabold text-gray-900">{item.quantityKg} kg</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Purity Grade</span>
                <span className="font-bold text-emerald-700">{item.purityGrade}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Base Rate</span>
                <span className="font-extrabold text-gray-900">₹{item.minimumBidPerKg} / kg</span>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">{item.notes}</p>

            <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-xs">
              <span className="text-gray-400">Total Lot Value: ₹{(item.quantityKg * item.minimumBidPerKg).toLocaleString()}</span>
              <span className="text-emerald-700 font-semibold font-mono">B2B Verified</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

