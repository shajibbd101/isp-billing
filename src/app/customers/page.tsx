'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, Search } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { DataTable } from '@/components/ui/DataTable';
import { Modal, Button, Input, Select, Badge, Card } from '@/components/ui';
import { mockUsers, mockPackages } from '@/data/mockData';
import { User } from '@/types';
import { useToast } from '@/lib/ToastContext';

export default function CustomersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const { addToast } = useToast();

  const [formData, setFormData] = useState<{
    name: string; email: string; phone: string; address: string; ip: string; mac: string; packageId: string; status: 'active' | 'suspended' | 'expired';
  }>({
    name: '', email: '', phone: '', address: '', ip: '', mac: '', packageId: '', status: 'active',
  });

  const filteredUsers = filterStatus === 'all' ? users : users.filter(u => u.status === filterStatus);

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.packageId) {
      addToast('error', 'Please fill all required fields');
      return;
    }

    if (selectedUser) {
      setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...formData } : u));
      addToast('success', 'Customer updated successfully');
    } else {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
        balance: 0,
      };
      setUsers([...users, newUser]);
      addToast('success', 'Customer added successfully');
    }
    closeModal();
  };

  const handleDelete = () => {
    setUsers(users.filter(u => u.id !== selectedUser?.id));
    addToast('success', 'Customer deleted successfully');
    setIsDeleteOpen(false);
    setSelectedUser(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setFormData({ name: '', email: '', phone: '', address: '', ip: '', mac: '', packageId: '', status: 'active' });
  };

  const openEdit = (user: User) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, phone: user.phone, address: user.address, ip: user.ip, mac: user.mac, packageId: user.packageId, status: user.status });
    setIsModalOpen(true);
  };

  const columns = [
    { key: 'name', header: 'Customer', render: (u: User) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white text-sm font-medium">
          {u.name.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-gray-800 dark:text-white">{u.name}</p>
          <p className="text-xs text-gray-500">{u.email}</p>
        </div>
      </div>
    )},
    { key: 'phone', header: 'Phone' },
    { key: 'ip', header: 'IP Address' },
    { key: 'mac', header: 'MAC Address' },
    { key: 'packageId', header: 'Package', render: (u: User) => mockPackages.find(p => p.id === u.packageId)?.name || '-' },
    { key: 'status', header: 'Status', render: (u: User) => <Badge variant={u.status}>{u.status}</Badge> },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Customers</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your ISP customers</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus size={18} className="mr-2" /> Add Customer
          </Button>
        </div>

        <Card className="p-4">
          <div className="flex flex-wrap gap-3">
            {['all', 'active', 'suspended', 'expired'].map(status => (
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
          data={filteredUsers}
          columns={columns}
          searchPlaceholder="Search by name, phone, IP..."
          searchKeys={['name', 'phone', 'ip']}
          onRowClick={(u) => { setSelectedUser(u); setIsViewOpen(true); }}
          actions={(u) => (
            <div className="flex items-center justify-end gap-2">
              <button onClick={(e) => { e.stopPropagation(); openEdit(u); }} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
                <Edit2 size={16} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); setSelectedUser(u); setIsDeleteOpen(true); }} className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500">
                <Trash2 size={16} />
              </button>
            </div>
          )}
        />

        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedUser ? 'Edit Customer' : 'Add Customer'} size="lg"
          footer={
            <>
              <Button variant="secondary" onClick={closeModal}>Cancel</Button>
              <Button onClick={handleSubmit}>{selectedUser ? 'Update' : 'Create'}</Button>
            </>
          }>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Name *" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Enter name" />
            <Input label="Email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Enter email" />
            <Input label="Phone *" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="Enter phone" />
            <Input label="Address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="Enter address" />
            <Input label="IP Address" value={formData.ip} onChange={e => setFormData({...formData, ip: e.target.value})} placeholder="192.168.x.x" />
            <Input label="MAC Address" value={formData.mac} onChange={e => setFormData({...formData, mac: e.target.value})} placeholder="00:1B:44:11:3A:B7" />
            <Select label="Package *" value={formData.packageId} onChange={e => setFormData({...formData, packageId: e.target.value})}
              options={[{value: '', label: 'Select package'}, ...mockPackages.map(p => ({value: p.id, label: p.name}))]} />
            <Select label="Status" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}
              options={[{value: 'active', label: 'Active'}, {value: 'suspended', label: 'Suspended'}, {value: 'expired', label: 'Expired'}]} />
          </div>
        </Modal>

        <Modal isOpen={isViewOpen} onClose={() => { setIsViewOpen(false); setSelectedUser(null); }} title="Customer Details" size="lg">
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">{selectedUser.name}</h3>
                  <p className="text-gray-500">{selectedUser.email}</p>
                  <Badge variant={selectedUser.status}>{selectedUser.status}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm text-gray-500">Phone</p><p className="font-medium">{selectedUser.phone}</p></div>
                <div><p className="text-sm text-gray-500">Address</p><p className="font-medium">{selectedUser.address}</p></div>
                <div><p className="text-sm text-gray-500">IP Address</p><p className="font-medium font-mono">{selectedUser.ip}</p></div>
                <div><p className="text-sm text-gray-500">MAC Address</p><p className="font-medium font-mono">{selectedUser.mac}</p></div>
                <div><p className="text-sm text-gray-500">Package</p><p className="font-medium">{mockPackages.find(p => p.id === selectedUser.packageId)?.name}</p></div>
                <div><p className="text-sm text-gray-500">Balance</p><p className="font-medium">₹{selectedUser.balance}</p></div>
                <div><p className="text-sm text-gray-500">Created</p><p className="font-medium">{selectedUser.createdAt}</p></div>
              </div>
            </div>
          )}
        </Modal>

        <Modal isOpen={isDeleteOpen} onClose={() => { setIsDeleteOpen(false); setSelectedUser(null); }} title="Confirm Delete" size="sm"
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </>
          }>
          <p className="text-gray-600 dark:text-gray-300">Are you sure you want to delete <strong>{selectedUser?.name}</strong>? This action cannot be undone.</p>
        </Modal>
      </div>
    </AppLayout>
  );
}
