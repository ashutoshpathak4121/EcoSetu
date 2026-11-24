import React, { useEffect, useState } from 'react';
import { adminApi } from '../../services/admin.api';
import { Users, Shield, CheckCircle2, Search } from 'lucide-react';
import { UserRole } from '../../../../shared/types';

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await adminApi.getUsers();
        setUsers(data || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await adminApi.updateUserRole(userId, newRole);
      setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
      setMsg(`Role updated to ${newRole}.`);
      setTimeout(() => setMsg(null), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleStatusToggle = async (userId: string, currentActive: boolean) => {
    const nextStatus = currentActive ? 'INACTIVE' : 'ACTIVE';
    try {
      await adminApi.updateUserStatus(userId, nextStatus);
      setUsers(users.map((u) => (u.id === userId ? { ...u, isActive: !currentActive } : u)));
      setMsg(`User status updated to ${nextStatus}.`);
      setTimeout(() => setMsg(null), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">User Account Governance</h1>
          <p className="text-xs text-gray-400">Manage stakeholder accounts and enforce Role-Based Access Control (RBAC)</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-9 pr-3.5 py-2 bg-white text-gray-900 border border-gray-300 rounded-xl text-xs placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {msg && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      <div className="bg-white text-gray-900 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {filtered.map((u) => (
            <div key={u.id} className="p-4 flex flex-wrap items-center justify-between gap-4 text-xs hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-forest-800 text-white font-bold flex items-center justify-center">
                  {u.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{u.name}</div>
                  <div className="text-gray-500 text-[11px]">{u.email} • {u.phoneNumber || 'Phone on file'}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => handleStatusToggle(u.id, u.isActive !== false)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                    u.isActive !== false
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                  }`}
                  title="Click to toggle active/inactive account status"
                >
                  {u.isActive !== false ? '● ACTIVE' : '○ DEACTIVATED'}
                </button>

                <span className="text-gray-500 font-semibold text-[11px]">Role:</span>
                <select
                  value={u.role}
                  onChange={(e) => handleRoleChange(u.id, e.target.value)}
                  className="px-3 py-1.5 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value={UserRole.RESIDENT}>RESIDENT</option>
                  <option value={UserRole.COLLECTOR}>COLLECTOR</option>
                  <option value={UserRole.SOCIETY_ADMIN}>SOCIETY_ADMIN</option>
                  <option value={UserRole.RECYCLER}>RECYCLER</option>
                  <option value={UserRole.MCD_OFFICER}>MCD_OFFICER</option>
                  <option value={UserRole.SUPER_ADMIN}>SUPER_ADMIN</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
