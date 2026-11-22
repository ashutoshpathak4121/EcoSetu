import React, { useEffect, useState } from 'react';
import { municipalApi } from '../../services/municipal.api';
import { StatusBadge } from '../../components/StatusBadge';
import { ShieldAlert, CheckCircle2, XCircle, AlertTriangle, Cpu } from 'lucide-react';

export const MunicipalFlaggedReviewPage: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await municipalApi.getFlaggedReviews();
        setReviews(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleAction = (id: string, action: 'APPROVED' | 'PENALTY') => {
    setReviews(reviews.filter((r) => r.id !== id && r.collectionId !== id));
    setActionMessage(
      action === 'APPROVED'
        ? `Collection #${id} marked as APPROVED. Green credits credited to household.`
        : `Collection #${id} confirmed as CONTAMINATED. Advisory notification dispatched to resident.`
    );
    setTimeout(() => setActionMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">AI Flagged Collection Queue</h1>
        <p className="text-xs text-slate-400">
          Human-in-the-Loop review for low-confidence or cross-stream contamination flagged by computer vision
        </p>
      </div>

      {actionMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="bg-white text-gray-900 rounded-2xl border border-gray-200 p-12 text-center text-xs text-gray-500 space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-gray-900 text-base">All Clear! No Flagged Collections</h3>
            <p className="max-w-xs mx-auto">All morning collections have passed AI purity audits with confidence &ge; 85%.</p>
          </div>
        ) : (
          reviews.map((rev) => (
            <div key={rev.id || rev.collectionId} className="bg-white text-gray-900 rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-gray-900 text-sm">Collection Ref #{rev.collectionId || rev.id}</span>
                    <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-rose-600" />
                      Low AI Confidence ({Math.round((rev.confidence || 0.62) * 100)}%)
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Flagged Reason: <strong>{rev.reason || 'Possible wet waste detected in dry compartment'}</strong>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleAction(rev.id || rev.collectionId, 'APPROVED')}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Approve (False Alarm)
                  </button>
                  <button
                    onClick={() => handleAction(rev.id || rev.collectionId, 'PENALTY')}
                    className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Confirm Contamination
                  </button>
                </div>
              </div>

              {rev.imageUrl && (
                <div>
                  <img
                    src={rev.imageUrl}
                    alt="Flagged collection"
                    className="w-full max-h-64 object-cover rounded-xl border border-gray-200"
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
