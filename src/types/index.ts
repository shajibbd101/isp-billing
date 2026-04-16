export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  ip: string;
  mac: string;
  packageId: string;
  status: 'active' | 'suspended' | 'expired';
  createdAt: string;
  balance: number;
}

export interface Package {
  id: string;
  name: string;
  speed: string;
  price: number;
  validity: number;
  dataLimit: string;
  status: 'active' | 'inactive';
}

export interface Invoice {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'paid' | 'unpaid' | 'overdue';
}

export interface Payment {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  method: 'cash' | 'bank' | 'online';
  date: string;
  invoiceId: string;
}

export interface Ticket {
  id: string;
  customerId: string;
  customerName: string;
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'closed';
  createdAt: string;
  messages: TicketMessage[];
}

export interface TicketMessage {
  id: string;
  sender: 'admin' | 'customer';
  message: string;
  timestamp: string;
}

export interface DashboardStats {
  totalCustomers: number;
  activeUsers: number;
  expiredUsers: number;
  monthlyRevenue: number;
  onlineUsers: number;
  offlineUsers: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
}

export interface CustomerGrowth {
  month: string;
  newCustomers: number;
  churnedCustomers: number;
}
