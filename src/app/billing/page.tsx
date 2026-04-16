'use client';

import React, { useState } from 'react';
import { Download, FileText, Calendar, DollarSign } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { DataTable } from '@/components/ui/DataTable';
import { Card, Button, Badge, Modal } from '@/components/ui';
import { mockInvoices, mockUsers } from '@/data/mockData';
import { Invoice } from '@/types';
import { useToast } from '@/lib/ToastContext';

export default function BillingPage() {
  const [invoices] = useState(mockInvoices);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const { addToast } = useToast();

  const filteredInvoices = filterStatus === 'all' ? invoices : invoices.filter(i => i.status === filterStatus);

  const stats = {
    total: invoices.length,
    paid: invoices.filter(i => i.status === 'paid').length,
    unpaid: invoices.filter(i => i.status === 'unpaid').length,
    overdue: invoices.filter(i => i.status === 'overdue').length,
  };

  const handleDownload = () => {
    addToast('success', 'Invoice PDF downloaded');
    setIsInvoiceOpen(false);
  };

  const columns = [
    { key: 'id', header: 'Invoice #' },
    { key: 'customerName', header: 'Customer' },
    { key: 'amount', header: 'Amount', render: (i: Invoice) => <span className="font-semibold">₹{i.amount}</span> },
    { key: 'date', header: 'Issue Date' },
    { key: 'dueDate', header: 'Due Date' },
    { key: 'status', header: 'Status', render: (i: Invoice) => <Badge variant={i.status}>{i.status}</Badge> },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Billing & Invoices</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage invoices and billing</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
                <FileText className="text-sky-600 dark:text-sky-400" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Invoices</p>
                <p className="text-xl font-bold text-gray-800 dark:text-white">{stats.total}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <DollarSign className="text-emerald-600 dark:text-emerald-400" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Paid</p>
                <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{stats.paid}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Calendar className="text-amber-600 dark:text-amber-400" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Unpaid</p>
                <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{stats.unpaid}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <FileText className="text-red-600 dark:text-red-400" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Overdue</p>
                <p className="text-xl font-bold text-red-600 dark:text-red-400">{stats.overdue}</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-4">
          <div className="flex flex-wrap gap-3">
            {['all', 'paid', 'unpaid', 'overdue'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === status
                    ? 'bg-sky-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </Card>

        <DataTable
          data={filteredInvoices}
          columns={columns}
          actions={(i) => (
            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedInvoice(i); setIsInvoiceOpen(true); }}>
              <Download size={16} className="mr-1" /> Download
            </Button>
          )}
        />

        <Modal isOpen={isInvoiceOpen} onClose={() => { setIsInvoiceOpen(false); setSelectedInvoice(null); }} title="Invoice Details" size="lg">
          {selectedInvoice && (
            <div className="space-y-6">
              <div className="flex justify-between items-start border-b border-gray-200 dark:border-gray-700 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">INVOICE</h3>
                  <p className="text-gray-500">{selectedInvoice.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Issue Date</p>
                  <p className="font-medium">{selectedInvoice.date}</p>
                  <p className="text-sm text-gray-500 mt-2">Due Date</p>
                  <p className="font-medium">{selectedInvoice.dueDate}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Bill To</p>
                  <p className="font-medium text-lg">{selectedInvoice.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="text-2xl font-bold text-sky-600">₹{selectedInvoice.amount}</p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-2">Status</p>
                <Badge variant={selectedInvoice.status}>{selectedInvoice.status}</Badge>
              </div>
              <div className="flex gap-3 pt-4">
                <Button onClick={handleDownload} className="flex-1">
                  <Download size={18} className="mr-2" /> Download PDF
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </AppLayout>
  );
}
