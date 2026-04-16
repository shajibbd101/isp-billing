'use client';

import React from 'react';
import { Users, UserCheck, UserX, DollarSign, Activity, Wifi, WifiOff } from 'lucide-react';
import { Card, Skeleton } from '@/components/ui';
import { mockDashboardStats, mockRevenueData, mockPayments, mockUsers } from '@/data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const stats = [
  { label: 'Total Customers', value: mockDashboardStats.totalCustomers, icon: Users, color: 'bg-sky-500', textColor: 'text-sky-600 dark:text-sky-400' },
  { label: 'Active Users', value: mockDashboardStats.activeUsers, icon: UserCheck, color: 'bg-emerald-500', textColor: 'text-emerald-600 dark:text-emerald-400' },
  { label: 'Expired Users', value: mockDashboardStats.expiredUsers, icon: UserX, color: 'bg-red-500', textColor: 'text-red-600 dark:text-red-400' },
  { label: 'Monthly Revenue', value: `₹${mockDashboardStats.monthlyRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-indigo-500', textColor: 'text-indigo-600 dark:text-indigo-400' },
];

export default function DashboardContent() {
  const onlinePercent = Math.round((mockDashboardStats.onlineUsers / mockDashboardStats.totalCustomers) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Welcome back! Here's what's happening today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-5">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Overview</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockRevenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f1f5f9' }}
                  formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Network Status</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Wifi className="text-emerald-600 dark:text-emerald-400" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{mockDashboardStats.onlineUsers}</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{onlinePercent}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <WifiOff className="text-gray-500 dark:text-gray-400" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Offline</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{mockDashboardStats.offlineUsers}</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-500 dark:text-gray-400">{100 - onlinePercent}%</span>
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm">
                <Activity className="text-sky-500" size={16} />
                <span className="text-gray-600 dark:text-gray-300">All systems operational</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Payments</h3>
          <div className="space-y-3">
            {mockPayments.slice(0, 5).map((payment) => (
              <div key={payment.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <DollarSign className="text-emerald-600 dark:text-emerald-400" size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{payment.customerName}</p>
                    <p className="text-xs text-gray-500">{payment.date}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">+₹{payment.amount}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Customers</h3>
          <div className="space-y-3">
            {mockUsers.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white text-sm font-medium">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.phone}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  user.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                  user.status === 'suspended' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
