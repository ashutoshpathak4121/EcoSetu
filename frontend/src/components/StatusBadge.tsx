import React from 'react';
import { CollectionStatus, VerificationStatus, ListingStatus } from '../../../shared/types';

interface StatusBadgeProps {
  status: CollectionStatus | VerificationStatus | ListingStatus | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getBadgeStyle = (val: string) => {
    switch (val) {
      case 'VERIFIED':
      case 'APPROVED':
      case 'ACTIVE':
      case 'COMPLETED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'PENDING':
      case 'ASSIGNED':
      case 'DRAFT':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'COLLECTOR_ON_THE_WAY':
      case 'IN_TRANSIT':
      case 'ON_ROUTE':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'COLLECTED':
      case 'WEIGHBRIDGE_VERIFIED':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'VERIFICATION_PENDING':
      case 'REQUIRES_REVIEW':
        return 'bg-yellow-50 text-yellow-800 border-yellow-300';
      case 'FLAGGED':
      case 'REJECTED':
      case 'CANCELLED':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatText = (val: string) => {
    return val.replace(/_/g, ' ');
  };

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full border tracking-wide uppercase ${
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
      } ${getBadgeStyle(status)}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70"></span>
      {formatText(status)}
    </span>
  );
};

