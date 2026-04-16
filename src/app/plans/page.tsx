'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Zap, Clock, HardDrive } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, Button, Input, Badge, Modal } from '@/components/ui';
import { mockPackages } from '@/data/mockData';
import { Package } from '@/types';
import { useToast } from '@/lib/ToastContext';

export default function PlansPage() {
  const [packages, setPackages] = useState(mockPackages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const { addToast } = useToast();

  const [formData, setFormData] = useState<{
    name: string; speed: string; price: string; validity: string; dataLimit: string; status: 'active' | 'inactive';
  }>({
    name: '', speed: '', price: '', validity: '', dataLimit: '', status: 'active',
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.speed || !formData.price || !formData.validity) {
      addToast('error', 'Please fill all required fields');
      return;
    }

    if (selectedPackage) {
      setPackages(packages.map(p => p.id === selectedPackage.id ? { ...p, ...formData, price: Number(formData.price), validity: Number(formData.validity) } : p));
      addToast('success', 'Plan updated successfully');
    } else {
      const newPackage: Package = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        price: Number(formData.price),
        validity: Number(formData.validity),
        status: 'active',
      };
      setPackages([...packages, newPackage]);
      addToast('success', 'Plan created successfully');
    }
    closeModal();
  };

  const handleDelete = () => {
    setPackages(packages.filter(p => p.id !== selectedPackage?.id));
    addToast('success', 'Plan deleted successfully');
    setIsDeleteOpen(false);
    setSelectedPackage(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
    setFormData({ name: '', speed: '', price: '', validity: '', dataLimit: '', status: 'active' });
  };

  const openEdit = (pkg: Package) => {
    setSelectedPackage(pkg);
    setFormData({ name: pkg.name, speed: pkg.speed, price: pkg.price.toString(), validity: pkg.validity.toString(), dataLimit: pkg.dataLimit, status: pkg.status });
    setIsModalOpen(true);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Plans & Packages</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your internet plans</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus size={18} className="mr-2" /> Add Plan
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">{pkg.name}</h3>
                  <p className="text-3xl font-bold text-sky-600 dark:text-sky-400 mt-1">₹{pkg.price}<span className="text-sm font-normal text-gray-500">/mo</span></p>
                </div>
                <Badge variant={pkg.status === 'active' ? 'active' : 'expired'}>{pkg.status}</Badge>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <Zap className="text-amber-500" size={18} />
                  <span>{pkg.speed} Speed</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <Clock className="text-indigo-500" size={18} />
                  <span>{pkg.validity} Days</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <HardDrive className="text-emerald-500" size={18} />
                  <span>{pkg.dataLimit} Data</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="secondary" size="sm" onClick={() => openEdit(pkg)} className="flex-1">
                  <Edit2 size={16} className="mr-1" /> Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => { setSelectedPackage(pkg); setIsDeleteOpen(true); }}>
                  <Trash2 size={16} className="text-red-500" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedPackage ? 'Edit Plan' : 'Create Plan'} size="md"
          footer={
            <>
              <Button variant="secondary" onClick={closeModal}>Cancel</Button>
              <Button onClick={handleSubmit}>{selectedPackage ? 'Update' : 'Create'}</Button>
            </>
          }>
          <div className="space-y-4">
            <Input label="Plan Name *" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Premium 50Mbps" />
            <Input label="Speed *" value={formData.speed} onChange={e => setFormData({...formData, speed: e.target.value})} placeholder="e.g. 50 Mbps" />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Price (₹) *" type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="1299" />
              <Input label="Validity (days) *" type="number" value={formData.validity} onChange={e => setFormData({...formData, validity: e.target.value})} placeholder="30" />
            </div>
            <Input label="Data Limit" value={formData.dataLimit} onChange={e => setFormData({...formData, dataLimit: e.target.value})} placeholder="e.g. 500 GB or Unlimited" />
          </div>
        </Modal>

        <Modal isOpen={isDeleteOpen} onClose={() => { setIsDeleteOpen(false); setSelectedPackage(null); }} title="Confirm Delete" size="sm"
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </>
          }>
          <p className="text-gray-600 dark:text-gray-300">Are you sure you want to delete <strong>{selectedPackage?.name}</strong>? This action cannot be undone.</p>
        </Modal>
      </div>
    </AppLayout>
  );
}
