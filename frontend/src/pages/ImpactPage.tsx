import React from 'react';
import { StatCard } from '../components/StatCard';
import { Leaf, Award, Recycle, Building, Users, TrendingUp } from 'lucide-react';
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

export const ImpactPage: React.FC = () => {
  const streamData = [
    { name: 'Wet Organic Waste', value: 55, color: '#2d6a4f' },
    { name: 'Dry Recyclables', value: 37, color: '#2563eb' },
    { name: 'Sanitary Waste', value: 6, color: '#dc2626' },
    { name: 'Special Care', value: 2, color: '#ca8a04' },
  ];

  const wardComparisonData = [
    { ward: 'Ward 203', compliance: 96.8, divertedTons: 4.8 },
    { ward: 'Ward 142', compliance: 92.4, divertedTons: 3.9 },
    { ward: 'Ward 089', compliance: 84.1, divertedTons: 2.7 },
    { ward: 'Ward 215', compliance: 89.6, divertedTons: 3.1 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Civic Transparency
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Our Environmental Impact</h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Measuring tangible CO2 offsets, landfill diversion, and green credit circulation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Landfill Diverted"
          value="12.45 MT"
          subtitle="Tons per day across Delhi wards"
          icon={Leaf}
          trend={{ value: '+14% this month', isPositive: true }}
          colorScheme="green"
        />
        <StatCard
          title="CO2 Emissions Averted"
          value="8.2 Tons"
          subtitle="Methane suppression via bio-compost"
          icon={Recycle}
          trend={{ value: '+9.2%', isPositive: true }}
          colorScheme="blue"
        />
        <StatCard
          title="Green Credits Minted"
          value="48,290"
          subtitle="Awarded to verified residents"
          icon={Award}
          trend={{ value: '+2,400 today', isPositive: true }}
          colorScheme="amber"
        />
        <StatCard
          title="Partner RWAs & Societies"
          value="48"
          subtitle="Active residential complexes"
          icon={Building}
          trend={{ value: '+4 new RWAs', isPositive: true }}
          colorScheme="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Stream distribution chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-base">4-Stream Waste Distribution (%)</h3>
          <p className="text-xs text-gray-500">Breakdown of total municipal tonnage collected this month</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={streamData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {streamData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ward compliance bar chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-base">Ward-Wise Segregation Compliance (%)</h3>
          <p className="text-xs text-gray-500">Source segregation purity scores evaluated by AI spot-checks</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wardComparisonData}>
                <XAxis dataKey="ward" textAnchor="end" tick={{ fontSize: 11 }} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="compliance" fill="#2d6a4f" radius={[4, 4, 0, 0]} name="Compliance %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

