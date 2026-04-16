'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, Package, Receipt, CreditCard,
  Network, Ticket, BarChart3, Settings, ChevronLeft, ChevronRight,
  Wifi
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/customers', icon: Users, label: 'Customers' },
  { href: '/plans', icon: Package, label: 'Plans' },
  { href: '/billing', icon: Receipt, label: 'Billing' },
  { href: '/payments', icon: CreditCard, label: 'Payments' },
  { href: '/network', icon: Network, label: 'Network' },
  { href: '/tickets', icon: Ticket, label: 'Tickets' },
  { href: '/reports', icon: BarChart3, label: 'Reports' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname() || '/';

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-gray-900 dark:bg-gray-950 border-r border-gray-800 transition-all duration-300 z-40 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex flex-col h-full">
        <div className={`flex items-center gap-3 px-4 h-16 border-b border-gray-800 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center flex-shrink-0">
            <Wifi className="text-white" size={22} />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <h1 className="text-white font-bold text-lg whitespace-nowrap">NetFlow</h1>
              <p className="text-xs text-gray-400 whitespace-nowrap">ISP Management</p>
            </div>
          )}
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group ${
                  isActive
                    ? 'bg-sky-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                <item.icon size={20} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'} />
                {!collapsed && <span className="font-medium whitespace-nowrap">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-800">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            {!collapsed && <span className="text-sm">Collapse</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
