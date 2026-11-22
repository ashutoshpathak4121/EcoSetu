import React, { useEffect, useState } from 'react';
import { municipalApi } from '../../services/municipal.api';
import { LeafletMap } from '../../components/LeafletMap';
import { Truck, Radio, Battery, Gauge, MapPin } from 'lucide-react';

const DEFAULT_VEHICLES = [
  {
    id: 'veh-01',
    vehicleId: 'veh-01',
    registrationNumber: 'DL-01-GA-4892',
    collectorName: 'Ramesh Kumar',
    driverName: 'Ramesh Kumar',
    status: 'ON_ROUTE',
    speedKmH: 22,
    batteryPercent: 78,
    currentWard: 'Ward 42 (Mayur Vihar)',
    latitude: 28.6083,
    longitude: 77.2985,
  },
  {
    id: 'veh-02',
    vehicleId: 'veh-02',
    registrationNumber: 'DL-01-GA-3419',
    collectorName: 'Manoj Yadav',
    driverName: 'Manoj Yadav',
    status: 'ON_ROUTE',
    speedKmH: 18,
    batteryPercent: 64,
    currentWard: 'Ward 43 (Patparganj)',
    latitude: 28.6142,
    longitude: 77.3041,
  },
];

export const MunicipalFleetPage: React.FC = () => {
  const [vehicles, setVehicles] = useState<any[]>(DEFAULT_VEHICLES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await municipalApi.getVehicles();
        if (Array.isArray(data) && data.length > 0) {
          setVehicles(data);
        }
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

  const safeVehicles = Array.isArray(vehicles) && vehicles.length > 0 ? vehicles : DEFAULT_VEHICLES;

  const markers = safeVehicles.map((v) => ({
    id: v.vehicleId || v.id,
    lat: v.latitude,
    lng: v.longitude,
    title: `${v.registrationNumber} (${v.collectorName || v.driverName})`,
    subtitle: `${v.currentWard} • Speed: ${v.speedKmH || 0} km/h`,
    type: 'vehicle' as const,
    status: v.status,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Sanitation Fleet GPS Telemetry</h1>
          <p className="text-xs text-slate-400">Live positioning of electric tippers and hydraulic compactors across Delhi Wards</p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-300 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Live Feed Active • {safeVehicles.length} Trucks On-Beat
        </div>
      </div>

      {/* Interactive Map */}
      <div className="bg-white text-gray-900 rounded-2xl border border-gray-200 p-4 shadow-sm">
        <LeafletMap center={[28.6083, 77.2942]} zoom={13} markers={markers} height="480px" />
      </div>

      {/* Fleet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {safeVehicles.map((v) => (
          <div key={v.vehicleId} className="bg-white text-gray-900 rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3 text-xs">
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
              <div>Driver: <strong>{v.collectorName}</strong></div>
              <div>Route: <strong>{v.currentWard}</strong></div>
            </div>

            <div className="pt-2 border-t border-gray-100 grid grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-center space-x-1.5 text-gray-700">
                <Battery className="w-3.5 h-3.5 text-emerald-600" />
                <span>{v.batteryPercent}% Battery</span>
              </div>
              <div className="flex items-center space-x-1.5 text-gray-700">
                <Gauge className="w-3.5 h-3.5 text-blue-600" />
                <span>{v.speedKmH} km/h Speed</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
