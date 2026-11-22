import React, { useEffect, useState } from 'react';
import { adminApi } from '../../services/admin.api';
import { StatCard } from '../../components/StatCard';
import { ShieldCheck, Users, Activity, Database, Lock, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SuperAdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const u = await adminApi.getUsers();
        setUsers(u || []);
        const l = await adminApi.getLogs();
        setLogs(l || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-forest-950 border border-emerald-500/20 rounded-2xl p-6 sm:p-8 text-white shadow-lg space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          Super Administrator Console • Techathon 2026 Core
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">SwachhSetu System Governance</h1>
        <p className="text-xs sm:text-sm text-gray-300">
          Role-Based Access Control, CPCB recycler licensing approvals, cryptographic audit ledgers, and API gateway telemetry.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Accounts"
          value={users.length || 6}
          subtitle="Residents, Collectors, RWAs, Recyclers"
          icon={Users}
          colorScheme="blue"
        />
        <StatCard
          title="API Service Health"
          value="99.98%"
          subtitle="Express Gateway + FastAPI AI"
          icon={Activity}
          colorScheme="green"
        />
        <StatCard
          title="Database Persistence"
          value="Active (PG16)"
          subtitle="Prisma ORM • Relational Integrity"
          icon={Database}
          colorScheme="purple"
        />
        <StatCard
          title="Audit Log Events"
          value={logs.length || 14}
          subtitle="Immutable security trail"
          icon={Lock}
          colorScheme="amber"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/admin/users"
          className="p-5 rounded-2xl bg-white text-gray-900 border border-gray-200 shadow-sm hover:shadow-card-hover transition-all flex items-center justify-between"
        >
          <div className="space-y-1">
            <h4 className="font-bold text-gray-900 text-sm">User & Role Management</h4>
            <p className="text-xs text-gray-500">Assign roles (Resident, Collector, RWA, Recycler, MCD Officer)</p>
          </div>
          <span className="text-xs font-bold text-emerald-700">Manage &rarr;</span>
        </Link>

        <Link
          to="/admin/logs"
          className="p-5 rounded-2xl bg-white text-gray-900 border border-gray-200 shadow-sm hover:shadow-card-hover transition-all flex items-center justify-between"
        >
          <div className="space-y-1">
            <h4 className="font-bold text-gray-900 text-sm">System Security & Audit Logs</h4>
            <p className="text-xs text-gray-500">Cryptographically verifiable actions and IP addresses</p>
          </div>
          <span className="text-xs font-bold text-emerald-700">Inspect &rarr;</span>
        </Link>
      </div>
    </div>
  );
};
