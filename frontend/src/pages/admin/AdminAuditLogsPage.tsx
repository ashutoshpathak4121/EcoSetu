import React, { useEffect, useState } from 'react';
import { adminApi } from '../../services/admin.api';
import { Lock, Shield, Calendar, Activity } from 'lucide-react';

export const AdminAuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await adminApi.getLogs();
        setLogs(data || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Security & Audit Logs</h1>
        <p className="text-xs text-gray-400">Immutable record of critical events, state changes, and API transactions</p>
      </div>

      <div className="bg-white text-gray-900 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {logs.map((log) => (
            <div key={log.id} className="p-4 flex flex-wrap items-center justify-between gap-4 text-xs hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 text-gray-700 rounded-lg">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-mono font-bold text-gray-900 text-xs">{log.action}</div>
                  <div className="text-[11px] text-gray-500">
                    Entity: <strong>{log.entity}</strong> • Ref: {log.entityId || 'SYS-EVENT'} • IP: {log.ipAddress || '127.0.0.1'}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="font-mono text-[11px] text-gray-600 block">
                  {new Date(log.createdAt).toLocaleString('en-IN')}
                </span>
                {log.details && (
                  <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {JSON.stringify(log.details)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
