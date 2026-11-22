import React, { useEffect, useState } from 'react';
import { municipalApi } from '../../services/municipal.api';
import { StatCard } from '../../components/StatCard';
import { Building2, Truck, Award, AlertTriangle, Download, Radio, ShieldCheck } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const DEFAULT_LOCALITIES = [
  { ward: 'Ward 42 (Mayur Vihar)', zone: 'East Zone', households: 4200, complianceScore: 96.8, dailyTonnageKg: 3420, status: 'EXCELLENT' },
  { ward: 'Ward 43 (Patparganj)', zone: 'East Zone', households: 3850, complianceScore: 93.4, dailyTonnageKg: 2950, status: 'EXCELLENT' },
  { ward: 'Ward 44 (Preet Vihar)', zone: 'East Zone', households: 3400, complianceScore: 89.2, dailyTonnageKg: 2800, status: 'GOOD' },
  { ward: 'Ward 45 (Laxmi Nagar)', zone: 'East Zone', households: 5100, complianceScore: 84.5, dailyTonnageKg: 3950, status: 'NEEDS_ATTENTION' },
];

export const MunicipalDashboard: React.FC = () => {
  const [overview, setOverview] = useState<any>(null);
  const [localities, setLocalities] = useState<any[]>(DEFAULT_LOCALITIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const oData = await municipalApi.getOverview();
        if (oData) setOverview(oData);
        const lData = await municipalApi.getLocalityAnalytics();
        if (Array.isArray(lData) && lData.length > 0) {
          setLocalities(lData);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const streamPieData = [
    { name: '🟢 Wet Organic', value: overview?.streamDistribution?.wetKg || 6840, color: '#2d6a4f' },
    { name: '🔵 Dry Recyclables', value: overview?.streamDistribution?.dryKg || 4620, color: '#2563eb' },
    { name: '🔴 Sanitary Waste', value: overview?.streamDistribution?.sanitaryKg || 710, color: '#dc2626' },
    { name: '🟡 Special-Care / Haz', value: overview?.streamDistribution?.specialCareKg || 280, color: '#ca8a04' },
  ];

  const handleExportCSV = () => {
    const headers = ['Ward', 'Zone', 'Registered Households', 'Compliance Score (%)', 'Daily Tonnage (Kg)', 'Status'];
    const rows = localities.map((l) => [l.ward, l.zone, l.households, l.complianceScore, l.dailyTonnageKg, l.status]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `EcoSetu_MCD_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-forest-900 via-emerald-950 to-gray-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
            <Radio className="w-3.5 h-3.5" />
            MCD Central Sanitation Command & Telemetry Grid
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Municipal Corporation (MCD) Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Real-time multi-ward monitoring, source segregation compliance, vehicle fleet tracking, and AI anomaly auditing.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <Download className="w-4 h-4" />
          Export Daily Ward CSV
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Daily Diverted Waste"
          value={`${overview?.todayTonnageMetricTons || '12.45'} MT`}
          subtitle="Collected & verified today"
          icon={Truck}
          colorScheme="green"
        />
        <StatCard
          title="City Segregation Rate"
          value={`${overview?.complianceRatePercentage || 94.2}%`}
          subtitle="4-Stream source purity"
          icon={Award}
          colorScheme="blue"
        />
        <StatCard
          title="Registered Households"
          value={overview?.totalHouseholds || 1480}
          subtitle="Across 48 partner RWAs"
          icon={Building2}
          colorScheme="amber"
        />
        <StatCard
          title="Flagged AI Reviews"
          value={overview?.pendingAIReviews || 8}
          subtitle="Pending supervisor adjudication"
          icon={AlertTriangle}
          colorScheme="rose"
        />
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stream Breakdown Pie */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
          <h3 className="font-bold text-gray-900 text-sm">Today's 4-Stream Tonnage Breakdown</h3>
          <p className="text-xs text-gray-500">Separated at household doorstep before vehicle loading</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={streamPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {streamPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [`${value} kg`, 'Collected Weight']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ward Leaderboard */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-sm">Ward Segregation Compliance Leaderboard</h3>
          <p className="text-xs text-gray-500">Evaluated via collector weighbridge telemetry and computer vision spot-checks</p>

          <div className="divide-y divide-gray-100 overflow-x-auto">
            {localities.map((loc, i) => (
              <div key={i} className="py-3 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-gray-900">{loc.ward}</div>
                  <div className="text-gray-400 text-[11px]">{loc.zone} • {loc.households} Homes</div>
                </div>

                <div className="flex items-center space-x-6">
                  <div>
                    <span className="text-gray-400 block text-[10px]">Tonnage</span>
                    <span className="font-bold text-gray-900">{loc.dailyTonnageKg} kg</span>
                  </div>

                  <div className="text-right">
                    <span className="text-gray-400 block text-[10px]">Compliance</span>
                    <span className="font-extrabold text-emerald-700 text-sm">{loc.complianceScore}%</span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${
                      loc.status === 'EXCELLENT'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : loc.status === 'GOOD'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    {loc.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

