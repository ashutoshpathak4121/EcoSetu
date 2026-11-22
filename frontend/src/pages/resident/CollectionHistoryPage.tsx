import React, { useEffect, useState } from 'react';
import { collectionApi } from '../../services/collection.api';
import { StatusBadge } from '../../components/StatusBadge';
import { History, Eye, Calendar, Sparkles, Filter } from 'lucide-react';
import { CollectionStatus } from '../../../../shared/types';

export const CollectionHistoryPage: React.FC = () => {
  const [collections, setCollections] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('ALL');
  const [selectedCol, setSelectedCol] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await collectionApi.getCollections();
        setCollections(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  const filtered = collections.filter((c) => {
    if (filter === 'ALL') return true;
    return c.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Collection Audit Trail</h1>
          <p className="text-xs text-gray-500">History of all doorstep handovers, weights, and AI verification logs</p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {['ALL', 'VERIFIED', 'ASSIGNED', 'VERIFICATION_PENDING'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-lg font-semibold border transition-all ${
                filter === status
                  ? 'bg-forest-800 text-white border-forest-800'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-xs text-gray-500">No collection records found for this filter.</div>
          ) : (
            filtered.map((col) => (
              <div key={col.id} className="p-5 hover:bg-gray-50/60 transition-colors space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono font-bold text-gray-900 text-sm">{col.collectionCode}</span>
                    <StatusBadge status={col.status} />
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {col.collectedAt ? new Date(col.collectedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Scheduled for today'}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div>
                    <span className="text-gray-400 block text-[11px]">Total Weight</span>
                    <span className="font-extrabold text-gray-900">{col.totalWeightKg || 0} kg</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">🟢 Wet Organic</span>
                    <span className="font-bold text-emerald-700">{col.wetWeightKg || 0} kg</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">🔵 Dry Recyclables</span>
                    <span className="font-bold text-blue-700">{col.dryWeightKg || 0} kg</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">Sanitary / Special</span>
                    <span className="font-bold text-gray-700">
                      {((col.sanitaryWeightKg || 0) + (col.specialCareWeightKg || 0)).toFixed(1)} kg
                    </span>
                  </div>
                </div>

                {col.aiVerification && (
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>
                        AI Verification: <strong>{col.aiVerification.predictedCategory}</strong> (Confidence: {Math.round(col.aiVerification.confidence * 100)}%, Contamination: {Math.round((col.aiVerification.contaminationIndex || 0) * 100)}%)
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                      {col.aiVerification.modelVersion}
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

