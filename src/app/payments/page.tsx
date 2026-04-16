'use client';

import React, { useState } from 'react';
import { Plus, Filter, DollarSign, Calendar } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { DataTable } from '@/components/ui/DataTable';
import { Card, Button, Input, Select, Badge, Modal } from '@/components/ui';
import { mockPayments, mockUsers, mockInvoices } from '@/data/mockData';
import { Payment } from '@/types';
import { useToast } from '@/lib/ToastContext';

export default function PaymentsPage() {
  const [payments, setPayments] = useState(mockPayments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({ customerId: '', amount: '', method: 'cash' as const, date: new Date().toISOString().split('T')[0], invoiceId: '' });

  const handleSubmit = () => {
    if (!formData.customerId || !formData.amount || !formData.date) {
      addToast('error', 'Please fill all required fields');
      return;
    }

    const customer = mockUsers.find(u => u.id === formData.customerId);
    const newPayment: Payment = {
      id: `PAY-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      customerId: formData.customerId,
      customerName: customer?.name || '',
      amount: Number(formData.amount),
      method: formData.method,
      date: formData.date,
      invoiceId: formData.invoiceId || `INV-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
    };

    setPayments([newPayment, ...payments]);
    addToast('success', 'Payment recorded successfully');
    setIsModalOpen(false);
    setFormData({ customerId: '', amount: '', method: 'cash', date: new Date().toISOString().split('T')[0], invoiceId: '' });
  };

  const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);
  const thisMonth = payments.filter(p => p.date.startsWith(new Date().toISOString().slice(0, 7))).reduce((sum, p) => sum + p.amount, 0);

  const columns = [
    { key: 'id', header: 'Payment ID' },
    { key: 'customerName', header: 'Customer' },
    { key: 'amount', header: 'Amount', render: (p: Payment) => <span className="font-semibold text-emerald-600">₹{p.amount}</span> },
    { key: 'method', header: 'Method', render: (p: Payment) => <Badge variant={p.method === 'online' ? 'active' : p.method === 'bank' ? 'medium' : 'low'}>{p.method}</Badge> },
    { key: 'date', header: 'Date' },
    { key: 'invoiceId', header: 'Invoice #' },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Payments</h1>
            <p className="text-gray-500 dark:text-gray-400">Record and manage payments</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus size={18} className="mr-2" /> Record Payment
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <DollarSign className="text-emerald-600 dark:text-emerald-400" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Collected</p>
                <p className="text-xl font-bold text-gray-800 dark:text-white">₹{totalCollected.toLocaleString()}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
                <Calendar className="text-sky-600 dark:text-sky-400" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">This Month</p>
                <p className="text-xl font-bold text-gray-800 dark:text-white">₹{thisMonth.toLocaleString()}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <DollarSign className="text-indigo-600 dark:text-indigo-400" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Transactions</p>
                <p className="text-xl font-bold text-gray-800 dark:text-white">{payments.length}</p>
              </div>
            </div>
          </Card>
        </div>

        <DataTable
          data={payments}
          columns={columns}
          searchPlaceholder="Search payments..."
          searchKeys={['customerName', 'id', 'invoiceId']}
        />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Record Payment" size="md"
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit}>Record Payment</Button>
            </>
          }>
          <div className="space-y-4">
            <Select label="Customer *" value={formData.customerId} onChange={e => setFormData({...formData, customerId: e.target.value})}
              options={[{value: '', label: 'Select customer'}, ...mockUsers.map(u => ({value: u.id, label: u.name}))]} />
            <Input label="Amount (₹) *" type="number" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} placeholder="Enter amount" />
            <Input label="Date" type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
            <Select label="Payment Method" value={formData.method} onChange={e => setFormData({...formData, method: e.target.value as any})}
              options={[{value: 'cash', label: 'Cash'}, {value: 'bank', label: 'Bank Transfer'}, {value: 'online', label: 'Online'}]} />
          </div>
        </Modal>
      </div>
    </AppLayout>
  );
}
