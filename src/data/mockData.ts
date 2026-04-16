import { User, Package, Invoice, Payment, Ticket, DashboardStats, RevenueData, CustomerGrowth } from '@/types';

export const mockPackages: Package[] = [
  { id: '1', name: 'Basic 10Mbps', speed: '10 Mbps', price: 499, validity: 30, dataLimit: '100 GB', status: 'active' },
  { id: '2', name: 'Standard 25Mbps', speed: '25 Mbps', price: 799, validity: 30, dataLimit: '250 GB', status: 'active' },
  { id: '3', name: 'Premium 50Mbps', speed: '50 Mbps', price: 1299, validity: 30, dataLimit: '500 GB', status: 'active' },
  { id: '4', name: 'Ultra 100Mbps', speed: '100 Mbps', price: 1999, validity: 30, dataLimit: 'Unlimited', status: 'active' },
  { id: '5', name: 'Business 50Mbps', speed: '50 Mbps', price: 2499, validity: 30, dataLimit: 'Unlimited', status: 'active' },
];

export const mockUsers: User[] = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 9876543210', address: '123 Main St, Mumbai', ip: '192.168.1.101', mac: '00:1B:44:11:3A:B7', packageId: '2', status: 'active', createdAt: '2024-01-15', balance: 0 },
  { id: '2', name: 'Priya Patel', email: 'priya@example.com', phone: '+91 9876543211', address: '456 Oak Ave, Delhi', ip: '192.168.1.102', mac: '00:1B:44:11:3A:B8', packageId: '3', status: 'active', createdAt: '2024-02-20', balance: 799 },
  { id: '3', name: 'Amit Kumar', email: 'amit@example.com', phone: '+91 9876543212', address: '789 Pine Rd, Bangalore', ip: '192.168.1.103', mac: '00:1B:44:11:3A:B9', packageId: '1', status: 'suspended', createdAt: '2024-03-10', balance: 1497 },
  { id: '4', name: 'Sneha Gupta', email: 'sneha@example.com', phone: '+91 9876543213', address: '321 Elm St, Chennai', ip: '192.168.1.104', mac: '00:1B:44:11:3A:BA', packageId: '4', status: 'active', createdAt: '2024-04-05', balance: 0 },
  { id: '5', name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 9876543214', address: '654 Maple Ln, Hyderabad', ip: '192.168.1.105', mac: '00:1B:44:11:3A:BB', packageId: '2', status: 'expired', createdAt: '2023-11-20', balance: 1598 },
  { id: '6', name: 'Anjali Reddy', email: 'anjali@example.com', phone: '+91 9876543215', address: '987 Cedar Blvd, Pune', ip: '192.168.1.106', mac: '00:1B:44:11:3A:BC', packageId: '5', status: 'active', createdAt: '2024-05-12', balance: 0 },
  { id: '7', name: 'Rajesh Khanna', email: 'rajesh@example.com', phone: '+91 9876543216', address: '147 Birch Way, Kolkata', ip: '192.168.1.107', mac: '00:1B:44:11:3A:BD', packageId: '3', status: 'active', createdAt: '2024-06-18', balance: 1299 },
  { id: '8', name: 'Meera Nair', email: 'meera@example.com', phone: '+91 9876543217', address: '258 Walnut Dr, Kochi', ip: '192.168.1.108', mac: '00:1B:44:11:3A:BE', packageId: '1', status: 'suspended', createdAt: '2024-07-22', balance: 998 },
  { id: '9', name: 'Deepak Choudhury', email: 'deepak@example.com', phone: '+91 9876543218', address: '369 Spruce Ct, Ahmedabad', ip: '192.168.1.109', mac: '00:1B:44:11:3A:BF', packageId: '4', status: 'active', createdAt: '2024-08-30', balance: 0 },
  { id: '10', name: 'Kavita Menon', email: 'kavita@example.com', phone: '+91 9876543219', address: '741 Ash Rd, Jaipur', ip: '192.168.1.110', mac: '00:1B:44:11:3A:C0', packageId: '2', status: 'active', createdAt: '2024-09-14', balance: 399 },
  { id: '11', name: 'Sanjay Verma', email: 'sanjay@example.com', phone: '+91 9876543220', address: '852 Teak Lane, Lucknow', ip: '192.168.1.111', mac: '00:1B:44:11:3A:C1', packageId: '3', status: 'expired', createdAt: '2023-12-05', balance: 2397 },
  { id: '12', name: 'Divya Agarwal', email: 'divya@example.com', phone: '+91 9876543221', address: '963 Fir Ave, Chandigarh', ip: '192.168.1.112', mac: '00:1B:44:11:3A:C2', packageId: '5', status: 'active', createdAt: '2024-10-08', balance: 0 },
];

export const mockInvoices: Invoice[] = [
  { id: 'INV-001', customerId: '1', customerName: 'Rahul Sharma', amount: 799, date: '2024-10-01', dueDate: '2024-10-15', status: 'paid' },
  { id: 'INV-002', customerId: '2', customerName: 'Priya Patel', amount: 1299, date: '2024-10-01', dueDate: '2024-10-15', status: 'unpaid' },
  { id: 'INV-003', customerId: '3', customerName: 'Amit Kumar', amount: 499, date: '2024-09-01', dueDate: '2024-09-15', status: 'overdue' },
  { id: 'INV-004', customerId: '4', customerName: 'Sneha Gupta', amount: 1999, date: '2024-10-01', dueDate: '2024-10-15', status: 'paid' },
  { id: 'INV-005', customerId: '5', customerName: 'Vikram Singh', amount: 799, date: '2024-08-01', dueDate: '2024-08-15', status: 'overdue' },
  { id: 'INV-006', customerId: '6', customerName: 'Anjali Reddy', amount: 2499, date: '2024-10-01', dueDate: '2024-10-15', status: 'paid' },
  { id: 'INV-007', customerId: '7', customerName: 'Rajesh Khanna', amount: 1299, date: '2024-10-01', dueDate: '2024-10-15', status: 'unpaid' },
  { id: 'INV-008', customerId: '8', customerName: 'Meera Nair', amount: 499, date: '2024-09-01', dueDate: '2024-09-15', status: 'overdue' },
];

export const mockPayments: Payment[] = [
  { id: 'PAY-001', customerId: '1', customerName: 'Rahul Sharma', amount: 799, method: 'online', date: '2024-10-03', invoiceId: 'INV-001' },
  { id: 'PAY-002', customerId: '4', customerName: 'Sneha Gupta', amount: 1999, method: 'bank', date: '2024-10-02', invoiceId: 'INV-004' },
  { id: 'PAY-003', customerId: '6', customerName: 'Anjali Reddy', amount: 2499, method: 'cash', date: '2024-10-01', invoiceId: 'INV-006' },
  { id: 'PAY-004', customerId: '9', customerName: 'Deepak Choudhury', amount: 1999, method: 'online', date: '2024-09-28', invoiceId: 'INV-009' },
  { id: 'PAY-005', customerId: '12', customerName: 'Divya Agarwal', amount: 2499, method: 'bank', date: '2024-09-25', invoiceId: 'INV-010' },
];

export const mockTickets: Ticket[] = [
  {
    id: 'TKT-001',
    customerId: '1',
    customerName: 'Rahul Sharma',
    subject: 'Slow internet speed',
    description: 'My connection is very slow especially during peak hours.',
    priority: 'medium',
    status: 'open',
    createdAt: '2024-10-10T10:30:00',
    messages: [
      { id: '1', sender: 'customer', message: 'My connection is very slow especially during peak hours.', timestamp: '2024-10-10T10:30:00' },
      { id: '2', sender: 'admin', message: 'We will check your line quality. Can you please restart your router?', timestamp: '2024-10-10T11:00:00' },
    ]
  },
  {
    id: 'TKT-002',
    customerId: '3',
    customerName: 'Amit Kumar',
    subject: 'Connection not working',
    description: 'No internet connectivity since yesterday.',
    priority: 'high',
    status: 'in_progress',
    createdAt: '2024-10-09T14:20:00',
    messages: [
      { id: '1', sender: 'customer', message: 'No internet connectivity since yesterday.', timestamp: '2024-10-09T14:20:00' },
      { id: '2', sender: 'admin', message: 'We have detected a fault in your area. Our team is working on it.', timestamp: '2024-10-09T15:00:00' },
      { id: '3', sender: 'admin', message: 'Expected resolution by evening.', timestamp: '2024-10-10T09:00:00' },
    ]
  },
  {
    id: 'TKT-003',
    customerId: '8',
    customerName: 'Meera Nair',
    subject: 'Billing discrepancy',
    description: 'I was charged twice for the same month.',
    priority: 'low',
    status: 'closed',
    createdAt: '2024-10-05T09:15:00',
    messages: [
      { id: '1', sender: 'customer', message: 'I was charged twice for the same month.', timestamp: '2024-10-05T09:15:00' },
      { id: '2', sender: 'admin', message: 'We have verified and refunded the duplicate charge.', timestamp: '2024-10-05T11:30:00' },
      { id: '3', sender: 'customer', message: 'Thank you! I received the refund.', timestamp: '2024-10-05T12:00:00' },
    ]
  },
];

export const mockDashboardStats: DashboardStats = {
  totalCustomers: 12,
  activeUsers: 7,
  expiredUsers: 2,
  monthlyRevenue: 45600,
  onlineUsers: 8,
  offlineUsers: 4,
};

export const mockRevenueData: RevenueData[] = [
  { month: 'Jan', revenue: 32000 },
  { month: 'Feb', revenue: 35000 },
  { month: 'Mar', revenue: 38000 },
  { month: 'Apr', revenue: 36000 },
  { month: 'May', revenue: 41000 },
  { month: 'Jun', revenue: 44000 },
  { month: 'Jul', revenue: 42000 },
  { month: 'Aug', revenue: 46000 },
  { month: 'Sep', revenue: 48000 },
  { month: 'Oct', revenue: 45600 },
];

export const mockCustomerGrowth: CustomerGrowth[] = [
  { month: 'Jan', newCustomers: 2, churnedCustomers: 0 },
  { month: 'Feb', newCustomers: 3, churnedCustomers: 1 },
  { month: 'Mar', newCustomers: 1, churnedCustomers: 0 },
  { month: 'Apr', newCustomers: 4, churnedCustomers: 1 },
  { month: 'May', newCustomers: 2, churnedCustomers: 0 },
  { month: 'Jun', newCustomers: 3, churnedCustomers: 0 },
  { month: 'Jul', newCustomers: 2, churnedCustomers: 1 },
  { month: 'Aug', newCustomers: 5, churnedCustomers: 0 },
  { month: 'Sep', newCustomers: 3, churnedCustomers: 1 },
  { month: 'Oct', newCustomers: 2, churnedCustomers: 0 },
];
