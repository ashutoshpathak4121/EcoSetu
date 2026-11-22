import React from 'react';
import { LeafletMap } from '../../components/LeafletMap';
import { Truck, MapPin, Radio, ShieldCheck } from 'lucide-react';

export const CollectorMapPage: React.FC = () => {
  const waypoints: any[] = [
    {
      id: 'veh-01',
      lat: 28.6083,
      lng: 77.2942,
      title: 'Current Vehicle: DL-01-GA-4892',
      subtitle: 'Electric Tipper • Active Route',
      type: 'vehicle',
      status: 'ON_ROUTE',
    },
    {
      id: 'soc-01',
      lat: 28.611,
      lng: 77.298,
      title: 'Gulmohar Enclave RWA',
      subtitle: 'Collection Stop 1',
      type: 'society',
      status: 'IN_PROGRESS',
    },
    {
      id: 'soc-02',
      lat: 28.6095,
      lng: 77.2958,
      title: 'Pocket 1 Mayur Vihar',
      subtitle: 'Collection Stop 2',
      type: 'society',
      status: 'QUEUED',
    },
    {
      id: 'soc-03',
      lat: 28.6125,
      lng: 77.2965,
      title: 'Samachar Apartments',
      subtitle: 'Collection Stop 3',
      type: 'society',
      status: 'QUEUED',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Ward 203 Collection GIS Map</h1>
          <p className="text-xs text-gray-500">Live GPS tracking of vehicle DL-01-GA-4892 and scheduled society pickup stops</p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="flex items-center gap-1 font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
            <Truck className="w-3.5 h-3.5" /> DL-01-GA-4892
          </span>
          <span className="flex items-center gap-1 font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
            <MapPin className="w-3.5 h-3.5" /> 3 Societies
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
        <LeafletMap center={[28.6083, 77.2942]} zoom={14} markers={waypoints} height="520px" />
      </div>
    </div>
  );
};

