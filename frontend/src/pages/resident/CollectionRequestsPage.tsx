import React, { useState } from 'react';
import { collectionApi } from '../../services/collection.api';
import { WasteStream } from '../../../../shared/types';
import { CalendarCheck, CheckCircle2, Clock, Truck, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CollectionRequestsPage: React.FC = () => {
  const [scheduledDate, setScheduledDate] = useState(new Date().toISOString().slice(0, 10));
  const [slot, setSlot] = useState('MORNING');
  const [wetKg, setWetKg] = useState('2.0');
  const [dryKg, setDryKg] = useState('1.5');
  const [hasSanitary, setHasSanitary] = useState(false);
  const [hasSpecial, setHasSpecial] = useState(false);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const streams: any[] = [
      { stream: WasteStream.WET, estimatedKg: parseFloat(wetKg) || 1.0 },
      { stream: WasteStream.DRY, estimatedKg: parseFloat(dryKg) || 1.0 },
    ];

    if (hasSanitary) streams.push({ stream: WasteStream.SANITARY, estimatedKg: 0.5 });
    if (hasSpecial) streams.push({ stream: WasteStream.SPECIAL_CARE, estimatedKg: 0.5 });

    try {
      await collectionApi.createCollection({
        scheduledDate,
        notes: `${notes ? notes + ' | ' : ''}Slot: ${slot}`,
        wasteStreams: streams,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit pickup request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Request Waste Pickup</h1>
        <p className="text-xs text-gray-500">Schedule daily municipal collection or notify collector for bulky dry streams</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
        {success ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Pickup Scheduled Successfully!</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
              Assigned to Collector Rajesh Kumar (DL-01-GA-4892) for tomorrow morning's run in Ward 203.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => setSuccess(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Schedule Another
              </button>
              <button
                onClick={() => navigate('/dashboard/resident/history')}
                className="px-4 py-2 bg-forest-800 text-white rounded-lg text-xs font-bold hover:bg-forest-700"
              >
                View Collection Queue
              </button>
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
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Preferred Time Window</label>
                <select
                  value={slot}
                  onChange={(e) => setSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
                    className="w-full px-3.5 py-2.5 bg-emerald-50/50 border border-emerald-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold"
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
                    className="w-full px-3.5 py-2.5 bg-blue-50/50 border border-blue-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-1">
                <label className="flex items-center space-x-2 text-xs font-medium text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasSanitary}
                    onChange={(e) => setHasSanitary(e.target.checked)}
                    className="rounded text-rose-600 focus:ring-rose-500"
                  />
                  <span>🔴 Include Sanitary Red-Dot Pouch</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-medium text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasSpecial}
                    onChange={(e) => setHasSpecial(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>🟡 Include Domestic Hazardous / E-Waste</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Special Collector Notes (Optional)</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Ring bell twice, bulk cardboard boxes bundled outside door."
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              ></textarea>
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
                  Confirm Doorstep Pickup
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

