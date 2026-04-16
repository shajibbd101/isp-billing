'use client';

import { AppLayout } from '@/components/layout/AppLayout';
import DashboardContent from './dashboard/page';

export default function Home() {
  return (
    <AppLayout>
      <DashboardContent />
    </AppLayout>
  );
}
