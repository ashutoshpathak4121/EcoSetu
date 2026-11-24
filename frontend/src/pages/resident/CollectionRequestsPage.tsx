import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { collectionApi } from '../../services/collection.api';
import { WasteStream } from '../../../../shared/types';
import { CalendarCheck, Clock, CheckCircle2, AlertCircle, Sparkles, Scale, Info } from 'lucide-react';

export const CollectionRequestsPage: React.FC = () => {
  const [scheduledDate, setScheduledDate] = useState(
    new Date(Date.now() + 86400000).toISOString().slice(0, 10)
  );
  const [slot, setSlot] = useState('MORNING');
  const [wetKg, setWetKg] = useState('2.0');
  const [dryKg, setDryKg] = useState('1.5');
  const [sanitaryKg, setSanitaryKg] = useState('0.0');
  const [specialKg, setSpecialKg] = useState('0.0');
  const [notes, setNotes] = useState('Divided bag ready at doorstep.');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [createdCode, setCreatedCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        scheduledDate,
        notes: `Slot: ${slot}. ${notes}`,
        wasteStreams: [
          { stream: WasteStream.WET, estimatedKg: parseFloat(wetKg) || 0 },
          { stream: WasteStream.DRY, estimatedKg: parseFloat(dryKg) || 0 },
          { stream: WasteStream.SANITARY, estimatedKg: parseFloat(sanitaryKg) || 0 },
          { stream: WasteStream.SPECIAL_CARE, estimatedKg: parseFloat(specialKg) || 0 },
        ],
      };

      const result = await collectionApi.createCollection(payload);
      const code = result?.collectionCode || result?.data?.collectionCode || `COL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setCreatedCode(code);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit pickup request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Schedule Segregated Waste Collection</h1>
        <p className="text-xs text-gray-500">
          Request a scheduled doorstep pickup with your 4-stream divided bag
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
        {success ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-gray-900">Collection Request Booked!</h3>
              <p className="text-xs text-gray-500">
                Your assigned sanitation driver will service your doorstep on {scheduledDate} ({slot.toLowerCase()} shift).
              </p>
              <div className="pt-2">
                <span className="font-mono text-xs font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-lg border border-emerald-200">
                  Ref Code: {createdCode}
                </span>
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => setSuccess(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold"
              >
                Schedule Another
              </button>
              <Link
                to="/resident/history"
                className="px-4 py-2 bg-forest-800 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                View in History
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Pickup Date</label>
                <input
                  type="date"
                  required
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Preferred Time Window</label>
                <select
                  value={slot}
                  onChange={(e) => setSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="MORNING">Morning Shift (8:00 AM - 11:00 AM)</option>
                  <option value="AFTERNOON">Afternoon Shift (1:30 PM - 4:00 PM)</option>
                </select>
              </div>
            </div>

            {/* Estimated Stream Quantities */}
            <div className="border-t border-gray-100 pt-4 space-y-3">
              <span className="text-xs font-bold text-gray-900 block">Estimated Quantities (Kg)</span>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-emerald-800 mb-1">🟢 Wet Organic Waste (Kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={wetKg}
                    onChange={(e) => setWetKg(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-emerald-50/50 border border-emerald-300 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-blue-800 mb-1">🔵 Dry Recyclables (Kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={dryKg}
                    onChange={(e) => setDryKg(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-blue-50/50 border border-blue-300 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-rose-800 mb-1">🔴 Sanitary Pouch (Kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={sanitaryKg}
                    onChange={(e) => setSanitaryKg(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-rose-50/50 border border-rose-300 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-rose-500 focus:outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-amber-800 mb-1">🟡 Special-Care / E-Waste (Kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={specialKg}
                    onChange={(e) => setSpecialKg(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-amber-50/50 border border-amber-300 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none font-bold"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Special Instructions for Collector</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Ring doorbell, dustbin placed next to plant pot"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 flex items-start gap-2">
              <Info className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Divided Bag Reminder:</strong> Place wet waste on the left compartment and clean recyclables on the right. Seal sanitary waste inside the red-dot pouch to ensure instant +20 Green Credits!
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <CalendarCheck className="w-4 h-4" />
                  Confirm Pickup Booking
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
