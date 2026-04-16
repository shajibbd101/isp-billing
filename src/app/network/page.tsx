'use client';

import React, { useState } from 'react';
import { Wifi, WifiOff, Power, Pause, Unplug, RefreshCw } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, Badge, Button } from '@/components/ui';
import { mockUsers, mockPackages } from '@/data/mockData';
import { User } from '@/types';
import { useToast } from '@/lib/ToastContext';

type NetworkUser = User & { onlineStatus: 'online' | 'offline' };

export default function NetworkPage() {
  const [users, setUsers] = useState<NetworkUser[]>(mockUsers.map(u => ({ ...u, onlineStatus: Math.random() > 0.3 ? 'online' : 'offline' })));
  const { addToast } = useToast();

  const onlineCount = users.filter(u => u.onlineStatus === 'online').length;
  const offlineCount = users.filter(u => u.onlineStatus === 'offline').length;

  const handleAction = (userId: string, action: 'activate' | 'suspend' | 'disconnect') => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        if (action === 'activate') return { ...u, onlineStatus: 'online', status: 'active' };
        if (action === 'suspend') return { ...u, onlineStatus: 'offline', status: 'suspended' };
        if (action === 'disconnect') return { ...u, onlineStatus: 'offline', status: 'expired' };
      }
      return u;
    }));
    addToast('success', `User ${action === 'activate' ? 'activated' : action === 'suspend' ? 'suspended' : 'disconnected'} successfully`);
  };

  const onlinePercent = Math.round((onlineCount / users.length) * 100);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Network Control</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage user connections and status</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">{users.length}</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
                <RefreshCw className="text-sky-600 dark:text-sky-400" size={28} />
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
                <p className="text-3xl font-bold text-emerald-600">{onlineCount}</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <Wifi className="text-emerald-600 dark:text-emerald-400" size={28} />
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Offline</p>
                <p className="text-3xl font-bold text-gray-500">{offlineCount}</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <WifiOff className="text-gray-500 dark:text-gray-400" size={28} />
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-5">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Connection Statistics</h3>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${onlinePercent}%` }} />
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-emerald-600 dark:text-emerald-400">{onlinePercent}% Online</span>
            <span className="text-gray-500">{100 - onlinePercent}% Offline</span>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">User Connections</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">IP Address</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Package</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Connection</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white text-sm font-medium">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-600 dark:text-gray-300">{user.ip}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{mockPackages.find(p => p.id === user.packageId)?.name}</td>
                    <td className="px-6 py-4"><Badge variant={user.status}>{user.status}</Badge></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {user.onlineStatus === 'online' ? (
                          <><Wifi size={16} className="text-emerald-500" /><span className="text-emerald-600 text-sm">Online</span></>
                        ) : (
                          <><WifiOff size={16} className="text-gray-400" /><span className="text-gray-500 text-sm">Offline</span></>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleAction(user.id, 'activate')} disabled={user.onlineStatus === 'online'}>
                          <Power size={16} className="text-emerald-500" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleAction(user.id, 'suspend')} disabled={user.status === 'suspended'}>
                          <Pause size={16} className="text-amber-500" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleAction(user.id, 'disconnect')}>
                          <Unplug size={16} className="text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
