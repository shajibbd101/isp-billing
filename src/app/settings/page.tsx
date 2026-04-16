'use client';

import React, { useState } from 'react';
import { User, Bell, Shield, Database, Palette, Save } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, Button, Input, Badge } from '@/components/ui';
import { useToast } from '@/lib/ToastContext';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const { addToast } = useToast();

  const handleSave = () => {
    addToast('success', 'Settings saved successfully');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'system', label: 'System', icon: Database },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="p-2">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-sky-600 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </Card>

          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Profile Settings</h2>
                <div className="space-y-4 max-w-md">
                  <Input label="Full Name" defaultValue="Admin User" />
                  <Input label="Email" type="email" defaultValue="admin@netflow.com" />
                  <Input label="Phone" defaultValue="+91 9876543210" />
                  <Input label="Company" defaultValue="NetFlow ISP" />
                  <Button onClick={handleSave}><Save size={18} className="mr-2" /> Save Changes</Button>
                </div>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  {['New payments', 'New tickets', 'Customer signups', 'Network alerts', 'Billing reminders'].map((item) => (
                    <div key={item} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:peer-checked:bg-sky-600"></div>
                      </label>
                    </div>
                  ))}
                  <Button onClick={handleSave}><Save size={18} className="mr-2" /> Save Preferences</Button>
                </div>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Security Settings</h2>
                <div className="space-y-4 max-w-md">
                  <Input label="Current Password" type="password" placeholder="Enter current password" />
                  <Input label="New Password" type="password" placeholder="Enter new password" />
                  <Input label="Confirm Password" type="password" placeholder="Confirm new password" />
                  <Button onClick={handleSave}><Save size={18} className="mr-2" /> Update Password</Button>
                </div>
              </Card>
            )}

            {activeTab === 'system' && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">System Information</h2>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-500">Version</span>
                    <Badge variant="active">v1.0.0</Badge>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-500">Environment</span>
                    <span className="text-gray-800 dark:text-white">Production</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-500">Database</span>
                    <span className="text-gray-800 dark:text-white">Connected</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-gray-500">Last Backup</span>
                    <span className="text-gray-800 dark:text-white">Today, 10:00 AM</span>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'appearance' && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Appearance</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</label>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 rounded-lg border-2 border-sky-500 bg-sky-50 text-sky-600">Dark</button>
                      <button className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300">Light</button>
                      <button className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300">System</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sidebar</label>
                    <select className="w-full max-w-xs px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                      <option>Collapsed by default</option>
                      <option>Expanded by default</option>
                    </select>
                  </div>
                  <Button onClick={handleSave}><Save size={18} className="mr-2" /> Save Appearance</Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
