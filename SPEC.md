# ISP Billing & Network Management Dashboard - Specification

## Project Overview
- **Project Name**: NetFlow ISP Dashboard
- **Type**: Web Application (Next.js + Tailwind CSS)
- **Core Functionality**: Professional ISP admin panel for managing broadband customers, billing, plans, and network operations
- **Target Users**: ISP administrators and staff

## UI/UX Specification

### Layout Structure
- **Sidebar**: 280px width, collapsible to 80px, fixed left position
- **Main Content**: Flexible width, padding 24px
- **Top Navbar**: 64px height, sticky top, contains search, notifications, user profile
- **Responsive Breakpoints**:
  - Mobile: < 768px (sidebar hidden, hamburger menu)
  - Tablet: 768px - 1024px (collapsed sidebar)
  - Desktop: > 1024px (full sidebar)

### Visual Design
- **Color Palette**:
  - Primary: `#0EA5E9` (Sky blue - brand color)
  - Secondary: `#6366F1` (Indigo - accents)
  - Success: `#10B981` (Emerald)
  - Warning: `#F59E0B` (Amber)
  - Danger: `#EF4444` (Red)
  - Dark Mode BG: `#0F172A` (Slate 900)
  - Dark Mode Card: `#1E293B` (Slate 800)
  - Light Mode BG: `#F8FAFC` (Slate 50)
  - Light Mode Card: `#FFFFFF`
  - Text Primary: `#F1F5F9` (dark) / `#1E293B` (light)
  - Text Secondary: `#94A3B8` (Slate 400)

- **Typography**:
  - Font Family: "DM Sans" (headings), "IBM Plex Sans" (body)
  - Headings: 24px (h1), 20px (h2), 16px (h3)
  - Body: 14px, Line height 1.5
  - Small: 12px

- **Spacing System**: 4px base unit (4, 8, 12, 16, 24, 32, 48)

- **Visual Effects**:
  - Card shadows: `0 1px 3px rgba(0,0,0,0.1)`
  - Hover transitions: 150ms ease
  - Border radius: 8px (cards), 6px (buttons), 4px (inputs)

### Components

#### Sidebar Navigation
- Logo at top with collapse toggle
- Navigation items with icons
- Active state: highlighted background, left border accent
- Sections: Dashboard, Customers, Plans, Billing, Payments, Network, Tickets, Reports, Settings

#### Top Navbar
- Search bar (expandable)
- Notification bell with badge
- User avatar dropdown (profile, logout)
- Dark/Light mode toggle

#### Status Badges
- Active: Green background (`#10B981`), white text
- Suspended: Amber background (`#F59E0B`), dark text
- Expired: Red background (`#EF4444`), white text
- Online: Green dot indicator
- Offline: Gray dot indicator

#### Data Tables
- Striped rows option
- Sortable columns
- Pagination controls
- Row hover effect
- Action buttons (edit, delete, view)

#### Modals
- Centered overlay with backdrop blur
- Header with title and close button
- Form fields with labels
- Footer with cancel/submit buttons
- Slide-in animation

#### Charts
- Revenue: Line chart (monthly)
- Customer growth: Bar chart
- Payment collection: Doughnut chart

## Functionality Specification

### Dashboard
- Stats cards: Total Customers, Active Users, Expired Users, Monthly Revenue
- Revenue chart: 12-month line chart
- Recent payments: Last 5 transactions table
- Network status: Online/Offline count with percentage

### Customer Management
- Search by name, phone, IP
- Filter by status (All, Active, Suspended, Expired)
- Pagination: 10/25/50 per page
- Add customer modal: Name, Phone, Email, Address, Package, IP, MAC
- Edit customer: Same fields + current balance
- Delete: Confirmation dialog
- Customer profile: Details + billing history table

### Plans/Packages
- List view with speed, price, validity, data limit
- Add/Edit plan modal
- Delete with confirmation

### Billing & Invoices
- Invoice list: Invoice #, Customer, Amount, Date, Status
- Status filter: All, Paid, Unpaid, Overdue
- Download invoice button (mock PDF)

### Payments
- Record payment: Customer select, amount, date, method
- Payment history table
- Filter by date range

### Network Control
- User list with online status indicator
- Actions: Activate, Suspend, Disconnect
- Status toggle switches

### Ticketing System
- Create ticket: Subject, description, priority
- Ticket list with status
- Chat-style reply interface

### Reports
- Revenue report: Monthly breakdown
- Customer growth: Monthly new vs churn
- Payment collection: By status

## Acceptance Criteria

1. ✅ Dashboard loads with all stat cards populated
2. ✅ Sidebar collapses and expands smoothly
3. ✅ Dark/Light mode toggles correctly
4. ✅ Customer table supports search, filter, pagination
5. ✅ Add/Edit/Delete customer modals work
6. ✅ Plans can be created and listed
7. ✅ Invoice list shows with status badges
8. ✅ Payment can be recorded (form submission)
9. ✅ Network status shows online/offline indicators
10. ✅ Tickets can be created and replied to
11. ✅ Reports page shows chart visualizations
12. ✅ Toast notifications appear for actions
13. ✅ Loading states show skeletons
14. ✅ Confirmation dialogs appear for delete actions
15. ✅ Responsive on tablet and desktop