import React, { useEffect, useState } from 'react';
import { collectorApi } from '../../services/collector.api';
import { StatusBadge } from '../../components/StatusBadge';
import { QrCode, Truck, CheckCircle2, ArrowRight, Camera, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const CollectorTasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleSimulateScan = async (task: any) => {
    try {
      await collectorApi.updateStatus(task.id, 'COLLECTOR_ON_THE_WAY');
      navigate(`/collector/upload?colId=${task.id}`);
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = tasks.filter((t) =>
    (t.addressSnapshot || '').toLowerCase().includes(search.toLowerCase()) ||
    t.collectionCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Today's Collection Tasks</h1>
          <p className="text-xs text-slate-400">Doorstep pickup runs assigned to vehicle DL-01-GA-4892 (Ward 42)</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search flat or code..."
            className="w-full pl-9 pr-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-white text-gray-900 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-xs font-bold text-gray-700">
          <span>Household & Address</span>
          <span>Status & Action</span>
        </div>

        <div className="divide-y divide-gray-100">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-xs text-gray-500">No pending collection tasks found.</div>
          ) : (
            filtered.map((task) => (
              <div key={task.id} className="p-4 flex flex-wrap items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-gray-900 text-xs">{task.collectionCode}</span>
                    <StatusBadge status={task.status} size="sm" />
                  </div>
                  <div className="text-xs font-semibold text-gray-800">{task.addressSnapshot || 'Flat B-402, Green Meadows Residency'}</div>
                  <div className="text-[11px] text-gray-500">{task.notes || 'Doorstep scheduled run'}</div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleSimulateScan(task)}
                    className="px-3 py-2 bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    Simulate Door QR Scan
                  </button>

                  <Link
                    to={`/collector/upload?colId=${task.id}`}
                    className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Camera className="w-3.5 h-3.5 text-slate-950" />
                    Log Weights
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
