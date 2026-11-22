import React, { useEffect, useState } from 'react';
import { municipalApi } from '../../services/municipal.api';
import { LeafletMap } from '../../components/LeafletMap';
import { Truck, Radio, Battery, Gauge, MapPin } from 'lucide-react';

export const MunicipalFleetPage: React.FC = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await municipalApi.getVehicles();
        setVehicles(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();

    // Auto-refresh telemetry every 10 seconds
    const interval = setInterval(fetchVehicles, 10000);
    return () => clearInterval(interval);
  }, []);

  const markers = vehicles.map((v) => ({
    id: v.vehicleId,
    lat: v.latitude,
    lng: v.longitude,
    title: `${v.registrationNumber} (${v.collectorName})`,
    subtitle: `${v.currentWard} • Speed: ${v.speedKmH} km/h`,
    type: 'vehicle' as const,
    status: v.status,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Sanitation Fleet GPS Telemetry</h1>
          <p className="text-xs text-gray-500">Live positioning of electric tippers and hydraulic compactors across Delhi Wards</p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Live Feed Active • {vehicles.length} Trucks On-Beat
        </div>
      </div>

      {/* Interactive Map */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
        <LeafletMap center={[28.6083, 77.2942]} zoom={13} markers={markers} height="480px" />
      </div>

      {/* Fleet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vehicles.map((v) => (
          <div key={v.vehicleId} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="font-mono font-extrabold text-gray-900 text-sm">{v.registrationNumber}</span>
              </div>
              <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                {v.status}
              </span>
            </div>

            <div className="space-y-1 text-gray-600">
              <div>Collector: <strong className="text-gray-900">{v.collectorName}</strong></div>
              <div>Ward: <strong>{v.currentWard}</strong></div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-[11px]">
              <div className="flex items-center gap-1.5 text-gray-500">
                <Gauge className="w-3.5 h-3.5 text-blue-600" />
                Speed: <strong>{v.speedKmH} km/h</strong>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500">
                <Battery className="w-3.5 h-3.5 text-emerald-600" />
                Battery: <strong>{v.batteryPercentage || 85}%</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

