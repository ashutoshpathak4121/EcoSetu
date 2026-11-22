import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { collectorApi } from '../../services/collector.api';
import { StatCard } from '../../components/StatCard';
import { Truck, MapPin, Camera, CheckCircle2, QrCode, ArrowRight, Radio } from 'lucide-react';
import { LeafletMap } from '../../components/LeafletMap';

export const CollectorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await collectorApi.getTasks();
        setTasks(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const waypoints: any[] = [
    {
      id: 'veh-01',
      lat: 28.6083,
      lng: 77.2942,
      title: 'Current Vehicle: DL-01-GA-4892',
      subtitle: 'Electric Tipper • 78% Battery',
      type: 'vehicle',
      status: 'ON_ROUTE',
    },
    {
      id: 'soc-01',
      lat: 28.611,
      lng: 77.298,
      title: 'Green Meadows Residency',
      subtitle: 'Target: 42 Flats • 34 Completed',
      type: 'society',
      status: 'ACTIVE_RUN',
    },
    {
      id: 'soc-02',
      lat: 28.6095,
      lng: 77.2958,
      title: 'Pocket 1 Mayur Vihar',
      subtitle: 'Next Scheduled Stop',
      type: 'society',
      status: 'QUEUED',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700/80 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold border border-amber-400/30">
            <Radio className="w-3.5 h-3.5 text-amber-400" />
            Active Collection Shift • Morning (8:00 AM - 1:00 PM)
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Collector Beat Console: {user?.name || 'Suresh Kumar'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Assigned Vehicle: <strong className="text-amber-400">DL-01-GA-4892 (Electric Tipper)</strong> • Beat: <strong className="text-amber-400">Ward 42 (East Delhi MCD)</strong>
          </p>
        </div>

        <div className="flex-shrink-0">
          <Link
            to="/collector/upload"
            className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <Camera className="w-4 h-4" />
            Upload Proof & Weights
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Route Progress"
          value="86 / 120"
          subtitle="Households serviced today"
          icon={CheckCircle2}
          trend={{ value: '71% completed', isPositive: true }}
          colorScheme="green"
        />
        <StatCard
          title="Today's Tonnage"
          value="284 kg"
          subtitle="Wet: 182kg • Dry: 102kg"
          icon={Truck}
          colorScheme="blue"
        />
        <StatCard
          title="Vehicle Battery"
          value="78%"
          subtitle="Remaining Range: 45 km"
          icon={Radio}
          colorScheme="amber"
        />
        <StatCard
          title="Average Purity Score"
          value="96.2%"
          subtitle="AI verified segregation"
          icon={CheckCircle2}
          colorScheme="purple"
        />
      </div>

      {/* Active Route Map */}
      <div className="bg-white text-gray-900 rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-base">Active GIS Collection Route</h3>
            <span className="text-xs text-gray-500">Live GPS tracking of your vehicle and assigned societies in Ward 42</span>
          </div>
          <Link to="/collector/map" className="text-xs font-bold text-amber-700 hover:underline">
            Fullscreen Map &rarr;
          </Link>
        </div>

        <LeafletMap center={[28.6083, 77.2942]} zoom={14} markers={waypoints} height="360px" />
      </div>

      {/* Quick Launchers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/collector/tasks"
          className="p-5 rounded-xl bg-white text-gray-900 border border-gray-200 shadow-sm hover:shadow-card-hover transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-50 text-blue-700 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Doorstep QR Scanner & Tasks</h4>
              <p className="text-xs text-gray-500">Scan household badges and log collections</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
        </Link>

        <Link
          to="/collector/upload"
          className="p-5 rounded-xl bg-white text-gray-900 border border-gray-200 shadow-sm hover:shadow-card-hover transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-amber-50 text-amber-700 rounded-xl group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Record Geo-Tagged Evidence</h4>
              <p className="text-xs text-gray-500">Capture photo proof and enter stream weights</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-amber-600" />
        </Link>
      </div>
    </div>
  );
};
