'use client';

import React, { useState } from 'react';
import { Search, Bell, Moon, Sun, ChevronDown, LogOut, User } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'New payment received', message: 'Rahul Sharma paid ₹799', time: '2 min ago' },
    { id: 2, title: 'Ticket created', message: 'New support ticket from Amit Kumar', time: '15 min ago' },
    { id: 3, title: 'Connection alert', message: '5 users offline in Zone A', time: '1 hour ago' },
  ];

  return (
    <header className="h-16 bg-gray-900 dark:bg-gray-950 border-b border-gray-800 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="lg:hidden p-2 rounded-lg hover:bg-gray-800 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search customers, invoices..."
            className="w-72 pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 transition-colors"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 transition-colors relative"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-700">
                <h3 className="font-semibold text-white">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif) => (
                  <div key={notif.id} className="px-4 py-3 hover:bg-gray-700/50 border-b border-gray-700/50 last:border-0">
                    <p className="text-sm font-medium text-white">{notif.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{notif.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-medium text-sm">
              A
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-white">Admin</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
            <ChevronDown size={16} className="hidden md:block text-gray-400" />
          </button>
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden">
              <div className="py-1">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                  <User size={16} /> Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-gray-700">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
