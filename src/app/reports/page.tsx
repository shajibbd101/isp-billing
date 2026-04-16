'use client';

import React from 'react';
import { DollarSign, Users, TrendingUp, CreditCard } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, Badge } from '@/components/ui';
import { mockRevenueData, mockCustomerGrowth, mockPayments } from '@/data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

export default function ReportsPage() {
  const totalRevenue = mockRevenueData.reduce((sum, r) => sum + r.revenue, 0);
  const totalNewCustomers = mockCustomerGrowth.reduce((sum, c) => sum + c.newCustomers, 0);
  const totalChurned = mockCustomerGrowth.reduce((sum, c) => sum + c.churnedCustomers, 0);
  const paymentMethods = [
    { name: 'Online', value: mockPayments.filter(p => p.method === 'online').length },
    { name: 'Bank', value: mockPayments.filter(p => p.method === 'bank').length },
    { name: 'Cash', value: mockPayments.filter(p => p.method === 'cash').length },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Reports</h1>
            <p className="text-gray-500 dark:text-gray-400">Analytics and insights</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <DollarSign className="text-emerald-600 dark:text-emerald-400" size={24} />
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">New Customers</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalNewCustomers}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
                <Users className="text-sky-600 dark:text-sky-400" size={24} />
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Churned</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{totalChurned}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <TrendingUp className="text-red-600 dark:text-red-400" size={24} />
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Avg Revenue/User</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">₹{Math.round(totalRevenue / 10)}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <CreditCard className="text-indigo-600 dark:text-indigo-400" size={24} />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-5">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Revenue Trend</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `₹${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f1f5f9' }}
                    formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Revenue']}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2} dot={{ fill: '#0ea5e9' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Customer Growth</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockCustomerGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f1f5f9' }}
                  />
                  <Legend />
                  <Bar dataKey="newCustomers" name="New" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="churnedCustomers" name="Churned" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-5">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Payment Methods</h3>
            <div className="h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethods}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {paymentMethods.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f1f5f9' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Monthly Breakdown</h3>
            <div className="space-y-4">
              {mockRevenueData.slice(-6).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{item.month}</span>
                  <div className="flex-1 mx-4">
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sky-500 rounded-full"
                        style={{ width: `${(item.revenue / totalRevenue) * 100 * 3}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">₹{(item.revenue / 1000).toFixed(1)}k</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
