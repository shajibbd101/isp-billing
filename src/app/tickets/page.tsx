'use client';

import React, { useState } from 'react';
import { Plus, Send, User, Clock, AlertCircle, CheckCircle, Circle } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, Badge, Button, Input, Modal, Select } from '@/components/ui';
import { mockTickets, mockUsers } from '@/data/mockData';
import { Ticket } from '@/types';
import { useToast } from '@/lib/ToastContext';

export default function TicketsPage() {
  const [tickets, setTickets] = useState(mockTickets);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newReply, setNewReply] = useState('');
  const { addToast } = useToast();

  const [formData, setFormData] = useState({ customerId: '', subject: '', description: '', priority: 'medium' as const });

  const handleCreate = () => {
    if (!formData.customerId || !formData.subject || !formData.description) {
      addToast('error', 'Please fill all required fields');
      return;
    }

    const customer = mockUsers.find(u => u.id === formData.customerId);
    const newTicket: Ticket = {
      id: `TKT-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      customerId: formData.customerId,
      customerName: customer?.name || '',
      subject: formData.subject,
      description: formData.description,
      priority: formData.priority,
      status: 'open',
      createdAt: new Date().toISOString(),
      messages: [{ id: '1', sender: 'customer', message: formData.description, timestamp: new Date().toISOString() }],
    };

    setTickets([newTicket, ...tickets]);
    addToast('success', 'Ticket created successfully');
    setIsCreateOpen(false);
    setFormData({ customerId: '', subject: '', description: '', priority: 'medium' });
  };

  const handleReply = () => {
    if (!newReply.trim() || !selectedTicket) return;

    const updatedMessage = {
      id: Math.random().toString(36).substr(2, 9),
      sender: 'admin' as const,
      message: newReply,
      timestamp: new Date().toISOString(),
    };

    setTickets(tickets.map(t => {
      if (t.id === selectedTicket.id) {
        const updated = { ...t, messages: [...t.messages, updatedMessage] };
        setSelectedTicket(updated);
        return updated;
      }
      return t;
    }));

    setNewReply('');
    addToast('success', 'Reply sent successfully');
  };

  const handleStatusChange = (status: 'open' | 'in_progress' | 'closed') => {
    setTickets(tickets.map(t => {
      if (t.id === selectedTicket?.id) {
        const updated = { ...t, status };
        setSelectedTicket(updated);
        return updated;
      }
      return t;
    }));
    addToast('success', 'Ticket status updated');
  };

  const openTickets = tickets.filter(t => t.status === 'open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in_progress').length;
  const closedTickets = tickets.filter(t => t.status === 'closed').length;

  const columns = [
    { key: 'id', header: 'Ticket ID' },
    { key: 'customerName', header: 'Customer' },
    { key: 'subject', header: 'Subject' },
    { key: 'priority', header: 'Priority', render: (t: Ticket) => <Badge variant={t.priority}>{t.priority}</Badge> },
    { key: 'status', header: 'Status', render: (t: Ticket) => <Badge variant={t.status}>{t.status.replace('_', ' ')}</Badge> },
    { key: 'createdAt', header: 'Created', render: (t: Ticket) => new Date(t.createdAt).toLocaleDateString() },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Support Tickets</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage customer support tickets</p>
          </div>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus size={18} className="mr-2" /> Create Ticket
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
                <Circle className="text-sky-600 dark:text-sky-400" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Open</p>
                <p className="text-xl font-bold text-sky-600 dark:text-sky-400">{openTickets}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Clock className="text-amber-600 dark:text-amber-400" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">In Progress</p>
                <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{inProgressTickets}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <CheckCircle className="text-emerald-600 dark:text-emerald-400" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Closed</p>
                <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{closedTickets}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-800 dark:text-white">All Tickets</h3>
              </div>
              <div className="divide-y divide-slate-200 dark:divide-slate-700 max-h-[600px] overflow-y-auto">
                {tickets.map((ticket) => (
                  <button
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket)}
                    className={`w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${selectedTicket?.id === ticket.id ? 'bg-sky-50 dark:bg-sky-900/20' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <p className="font-medium text-gray-800 dark:text-white text-sm">{ticket.subject}</p>
                      <Badge variant={ticket.status}>{ticket.status === 'open' ? 'Open' : ticket.status === 'in_progress' ? 'In Progress' : 'Closed'}</Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{ticket.customerName}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(ticket.createdAt).toLocaleDateString()}</p>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {selectedTicket ? (
              <Card className="h-[600px] flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">{selectedTicket.subject}</h3>
                    <p className="text-xs text-gray-500">#{selectedTicket.id} • {selectedTicket.customerName}</p>
                  </div>
                  <Select
                    value={selectedTicket.status}
                    onChange={(e) => handleStatusChange(e.target.value as any)}
                    options={[
                      { value: 'open', label: 'Open' },
                      { value: 'in_progress', label: 'In Progress' },
                      { value: 'closed', label: 'Closed' },
                    ]}
                  />
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedTicket.messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] p-3 rounded-xl ${
                        msg.sender === 'admin'
                          ? 'bg-sky-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <User size={14} className={msg.sender === 'admin' ? 'text-sky-200' : 'text-gray-400'} />
                          <span className="text-xs opacity-70">{msg.sender === 'admin' ? 'Support' : selectedTicket.customerName}</span>
                        </div>
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1">{new Date(msg.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                      placeholder="Type your reply..."
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                      onKeyDown={(e) => e.key === 'Enter' && handleReply()}
                    />
                    <Button onClick={handleReply}>
                      <Send size={18} />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-[600px] flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Select a ticket to view conversation</p>
                </div>
              </Card>
            )}
          </div>
        </div>

        <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create New Ticket" size="md"
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button onClick={handleCreate}>Create Ticket</Button>
            </>
          }>
          <div className="space-y-4">
            <Select label="Customer *" value={formData.customerId} onChange={e => setFormData({...formData, customerId: e.target.value})}
              options={[{value: '', label: 'Select customer'}, ...mockUsers.map(u => ({value: u.id, label: u.name}))]} />
            <Input label="Subject *" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} placeholder="Enter subject" />
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description *</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Describe the issue..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <Select label="Priority" value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value as any})}
              options={[{value: 'low', label: 'Low'}, {value: 'medium', label: 'Medium'}, {value: 'high', label: 'High'}]} />
          </div>
        </Modal>
      </div>
    </AppLayout>
  );
}
