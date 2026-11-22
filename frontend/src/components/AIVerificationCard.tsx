import React from 'react';
import { StatusBadge } from './StatusBadge';
import { Cpu, CheckCircle2, AlertTriangle, Eye, ShieldCheck, Sparkles } from 'lucide-react';

interface AIVerificationCardProps {
  result: {
    predictedCategory: string;
    confidence: number;
    contaminationIndex: number;
    detectedItems?: string[];
    verificationStatus: string;
    modelVersion?: string;
    reviewerNote?: string;
    manualReviewReasons?: string[];
  };
}

export const AIVerificationCard: React.FC<AIVerificationCardProps> = ({ result }) => {
  const confidencePercent = Math.round(result.confidence * 100);
  const contaminationPercent = Math.round((result.contaminationIndex || 0) * 100);

  const getStatusMessage = () => {
    if (result.verificationStatus === 'APPROVED') {
      return {
        title: 'Segregation Verified by AI Model',
        desc: 'Zero major contamination detected. Source segregation qualifies for green credits.',
        color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
        icon: ShieldCheck,
      };
    }
    if (result.verificationStatus === 'REQUIRES_REVIEW') {
      return {
        title: 'Requires Supervisor Spot Review',
        desc: 'Moderate confidence score or slight cross-stream presence flagged for audit.',
        color: 'text-yellow-800 bg-yellow-50 border-yellow-200',
        icon: AlertTriangle,
      };
    }
    return {
      title: 'Flagged Mismatch / Contamination',
      desc: 'Severe discrepancy between declared stream and visual items. Human verification mandatory.',
      color: 'text-rose-800 bg-rose-50 border-rose-200',
      icon: AlertTriangle,
    };
  };

  const statusMsg = getStatusMessage();
  const StatusIcon = statusMsg.icon;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-card space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-forest-50 text-forest-700 rounded-md">
            <Cpu className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
              SwachhSetu AI Computer Vision Engine
              <span className="text-[10px] font-mono px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                {result.modelVersion || 'swachhsetu-waste-v2.1'}
              </span>
            </h4>
            <span className="text-xs text-gray-500">Autonomous 4-Stream Multi-label Classifier</span>
          </div>
        </div>
        <StatusBadge status={result.verificationStatus} />
      </div>

      <div className={`p-3 rounded-lg border flex items-start gap-3 ${statusMsg.color}`}>
        <StatusIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="text-xs">
          <div className="font-bold">{statusMsg.title}</div>
          <div className="mt-0.5 opacity-90">{statusMsg.desc}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Confidence metric */}
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="font-semibold text-gray-600">Classification Confidence</span>
            <span className="font-bold text-emerald-700">{confidencePercent}%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                confidencePercent >= 85 ? 'bg-emerald-500' : confidencePercent >= 60 ? 'bg-yellow-500' : 'bg-rose-500'
              }`}
              style={{ width: `${confidencePercent}%` }}
            ></div>
          </div>
          <div className="mt-1 text-[11px] text-gray-500 flex justify-between">
            <span>Predicted: <strong className="uppercase text-gray-800">{result.predictedCategory}</strong></span>
            <span>Threshold: 85%</span>
          </div>
        </div>

        {/* Contamination index */}
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="font-semibold text-gray-600">Cross-Contamination Index</span>
            <span className={`font-bold ${contaminationPercent > 10 ? 'text-rose-600' : 'text-emerald-700'}`}>
              {contaminationPercent}%
            </span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                contaminationPercent <= 10 ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
              style={{ width: `${Math.min(100, contaminationPercent * 3)}%` }}
            ></div>
          </div>
          <div className="mt-1 text-[11px] text-gray-500 flex justify-between">
            <span>Purity: {100 - contaminationPercent}%</span>
            <span>Tolerance: &le; 10%</span>
          </div>
        </div>
      </div>

      {/* Detected tags */}
      {result.detectedItems && result.detectedItems.length > 0 && (
        <div>
          <span className="text-xs font-semibold text-gray-600 block mb-1.5 flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            Detected Object Signatures:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {result.detectedItems.map((item, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700 border border-gray-200 font-mono"
              >
                #{item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Manual review reasons if any */}
      {result.manualReviewReasons && result.manualReviewReasons.length > 0 && (
        <div className="text-xs bg-amber-50/80 p-2.5 rounded-lg border border-amber-200 text-amber-900">
          <strong className="block font-semibold mb-1">Audit Flags:</strong>
          <ul className="list-disc list-inside space-y-0.5">
            {result.manualReviewReasons.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

