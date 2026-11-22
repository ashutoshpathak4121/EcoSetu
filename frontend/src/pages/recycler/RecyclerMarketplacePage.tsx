import React, { useEffect, useState } from 'react';
import { marketplaceApi } from '../../services/marketplace.api';
import { StatusBadge } from '../../components/StatusBadge';
import { Scale, CheckCircle2, AlertCircle, ShoppingCart, Tag, Filter, Search } from 'lucide-react';

export const RecyclerMarketplacePage: React.FC = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedListing, setSelectedListing] = useState<any | null>(null);
  const [offeredPrice, setOfferedPrice] = useState<string>('34.0');
  const [notes, setNotes] = useState('Immediate electric carrier dispatch.');
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

  const handleOpenBid = (listing: any) => {
    setSelectedListing(listing);
    setOfferedPrice((listing.minimumBidPerKg + 1.5).toFixed(1));
    setSuccessMsg(null);
    setError(null);
  };

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

      setSuccessMsg(`Bid of ₹${offeredPrice}/kg submitted successfully to ${selectedListing.societyName || 'Gulmohar Enclave RWA'}.`);
      setSelectedListing(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Bid submission failed.');
    } finally {
      setLoading(false);
    }
  };

  const filtered = listings.filter(
    (l) =>
      l.subType.toLowerCase().includes(search.toLowerCase()) ||
      (l.localityName || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Available Recyclable Material Lots</h1>
          <p className="text-xs text-gray-500">Verified feedstock from registered societies • Zero mixed contamination</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by material (PET, Cardboard)..."
            className="w-full pl-9 pr-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
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
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Logistics / Pickup Notes</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Electric mini-truck arrival tomorrow 10 AM"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedListing(null)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg shadow-sm"
                >
                  {loading ? 'Submitting...' : 'Submit Formal Bid'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grid of Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-card-hover transition-all flex flex-col justify-between">
            <div>
              <div className="h-44 w-full overflow-hidden bg-gray-100 relative">
                <img
                  src={item.images?.[0] || 'https://images.unsplash.com/photo-1528323273322-d81458248d40?w=500'}
                  alt={item.subType}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-forest-900/90 text-white text-xs font-bold">
                  {item.purityGrade}
                </span>
                <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-white/90 text-gray-800 text-[10px] font-bold">
                  {item.quantityKg} Kg Available
                </span>
              </div>

              <div className="p-5 space-y-2 text-xs">
                <div className="font-mono text-[10px] text-gray-400 font-bold">{item.listingCode}</div>
                <h3 className="font-bold text-gray-900 text-base">{item.subType}</h3>
                <p className="text-gray-500">{item.pickupAddress}</p>
                <div className="font-extrabold text-sm text-amber-700 pt-1">
                  Base: ₹{item.minimumBidPerKg} / kg
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => handleOpenBid(item)}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Place Purchase Request
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

