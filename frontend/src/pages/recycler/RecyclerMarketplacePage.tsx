import React, { useEffect, useState } from 'react';
import { marketplaceApi } from '../../services/marketplace.api';
import { WasteStream } from '../../../../shared/types';
import { ShoppingBag, Scale, Award, Search, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const RecyclerMarketplacePage: React.FC = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [offeredPrice, setOfferedPrice] = useState('34.0');
  const [notes, setNotes] = useState('Payment via escrow. Electric vehicle dispatch scheduled.');
  const [search, setSearch] = useState('');
  const [streamFilter, setStreamFilter] = useState('ALL');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
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

  const handleSubmitBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedListing) return;

    setLoading(true);
    setError(null);

    try {
      await marketplaceApi.submitPurchaseRequest(selectedListing.id, {
        offeredPricePerKg: parseFloat(offeredPrice) || selectedListing.minimumBidPerKg,
        requestedQuantityKg: selectedListing.quantityKg,
        notes,
      });

      setSuccessMsg(`Bid of ₹${offeredPrice}/kg submitted successfully for Lot ${selectedListing.listingCode || 'selected lot'}!`);
      setSelectedListing(null);
      setTimeout(() => setSuccessMsg(null), 5000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit bid.');
    } finally {
      setLoading(false);
    }
  };

  const filtered = listings.filter((l) => {
    const matchesSearch =
      (l.subType || '').toLowerCase().includes(search.toLowerCase()) ||
      (l.listingCode || '').toLowerCase().includes(search.toLowerCase()) ||
      (l.society?.name || '').toLowerCase().includes(search.toLowerCase());
    const matchesStream = streamFilter === 'ALL' || l.category === streamFilter;
    return matchesSearch && matchesStream;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Verified Waste Scrap Marketplace</h1>
          <p className="text-xs text-zinc-400">Bid on segregated, baled recyclables directly aggregated by East Delhi housing societies</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={streamFilter}
            onChange={(e) => setStreamFilter(e.target.value)}
            className="px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500"
          >
            <option value="ALL">All Streams</option>
            <option value={WasteStream.DRY}>🔵 Dry Recyclables</option>
            <option value={WasteStream.WET}>🟢 Compost & Bio-Cake</option>
            <option value={WasteStream.SPECIAL_CARE}>🟡 Domestic E-Waste</option>
          </select>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search lot or material..."
              className="w-full pl-9 pr-3.5 py-2 bg-white text-gray-900 border border-gray-300 rounded-xl text-xs placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Bid Modal */}
      {selectedListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white text-gray-900 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-900 text-base">Submit Purchase Bid</h3>
              <button onClick={() => setSelectedListing(null)} className="text-gray-400 text-sm font-bold">✕</button>
            </div>

            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="text-xs bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-1">
              <div className="font-bold text-gray-900">{selectedListing.subType}</div>
              <div className="text-gray-500">Lot: {selectedListing.quantityKg} kg • Base: ₹{selectedListing.minimumBidPerKg}/kg</div>
            </div>

            <form onSubmit={handleSubmitBid} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Your Offered Price (₹ / Kg)</label>
                <input
                  type="number"
                  step="0.5"
                  required
                  value={offeredPrice}
                  onChange={(e) => setOfferedPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-bold text-sm text-gray-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Logistics / Pickup Notes</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Electric mini-truck arrival tomorrow 10 AM"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedListing(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-lg shadow-md disabled:opacity-50"
                >
                  {loading ? 'Submitting Bid...' : 'Confirm & Place Bid'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grid of Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white text-gray-900 rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-gray-900">{item.listingCode || 'LOT-2026-001'}</span>
                <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-amber-50 text-amber-800 border border-amber-200">
                  {item.purityGrade || 'Grade A'}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-sm leading-tight">{item.subType}</h3>
              <p className="text-xs text-gray-500">Seller: <strong>{item.society?.name || 'Green Meadows Residency'}</strong></p>
              <p className="text-xs text-gray-600">{item.notes}</p>
            </div>

            <div className="space-y-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-400 text-[10px] block">Total Lot Weight</span>
                  <span className="font-extrabold text-gray-900 text-sm">{item.quantityKg} Kg</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 text-[10px] block">Reserve Bid</span>
                  <span className="font-extrabold text-emerald-700 text-sm">₹{item.minimumBidPerKg} / Kg</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedListing(item);
                  setOfferedPrice((item.minimumBidPerKg + 2).toString());
                }}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                Place Purchase Bid
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
