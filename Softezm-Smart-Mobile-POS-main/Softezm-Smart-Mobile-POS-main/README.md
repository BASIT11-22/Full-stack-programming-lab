# Mobile Shop POS System

A comprehensive Point of Sale system for mobile phone retail shops with inventory management, sales tracking, and analytics.

## 🎯 Features

### Dashboard
- **Real-time metrics**: Total revenue, sales count, inventory levels, and order values
- **Weekly sales trends**: Line chart showing sales and revenue trends
- **Inventory summary**: Quick overview of top products and stock levels
- **Responsive design**: Works seamlessly on desktop and mobile devices

### Inventory Management
- **Mobile Phones**: Full inventory tracking for phones with storage, color, and pricing
- **Accessories**: Manage accessories like cases, chargers, and screen protectors
- **Search & Filter**: Quickly find products by name or category
- **CRUD Operations**: Add, edit, and delete products with real-time updates
- **Stock Status**: Visual indicators for stock levels (In Stock, Low Stock, Critical)

### Point of Sale (POS)
- **Product Search**: Quickly search and add products to cart
- **Shopping Cart**: Real-time cart management with quantity adjustment
- **Automatic Calculations**: Tax calculation (10%) and total computation
- **Multiple Payment Methods**: Cash, Card, and Pending payment options
- **Order Confirmation**: Payment confirmation modal with order summary

### Sales & Payments
- **Pending Payments Tracking**: Monitor all outstanding payments
- **Customer Details**: Track customer names, phone numbers, and purchase history
- **Overdue Indicators**: Visual alerts for payments overdue by days
- **Payment Collection**: Mark payments as collected or cancel transactions
- **Statistics**: Total pending amount, overdue count, and order metrics

### Analytics & Reports
- **Revenue Charts**: Monthly revenue and profit tracking with bar charts
- **Sales Distribution**: Pie chart showing sales by product category
- **Top Products**: Ranked list of best-selling products with visual bars
- **Sales Trends**: Line chart showing daily sales performance
- **Interactive Charts**: Hover tooltips and responsive design

### Settings
- **Account Management**: Update profile, email, and phone information
- **Store Settings**: Customize store name and address
- **Notification Preferences**: Control email, SMS, and alert notifications
- **Security Options**: Two-factor authentication and session timeout settings
- **Password Management**: Secure password change functionality

### Admin Panel
- **User Management**: Add, edit, and delete admin users and staff
- **Role Management**: Assign roles (Owner, Manager, Staff)
- **User Statistics**: Overview of total users, owners, and staff members
- **Search Users**: Find users by name or email
- **User Tracking**: Join dates and contact information

## 🎨 Design System

### Color Palette
- **Primary**: Teal (#25 80% 260°) - Main brand color
- **Accent**: Orange (#62 22% 29°) - Action buttons and highlights
- **Secondary**: Yellow (#92 4% 40°) - Supporting elements
- **Sidebar**: Dark teal (#25 8% 260°) - Navigation background
- **Background**: Light gray (#98 0.2% 260°) - Page background

### Components
- **Stat Cards**: Colorful cards with gradient backgrounds and trend indicators
- **Interactive Tables**: Hover effects and smooth animations
- **Modal Forms**: Animated dialogs for adding/editing products
- **Navigation**: Collapsible sidebar with smooth transitions
- **Charts**: Recharts integration for data visualization

## 📱 Technology Stack

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS with design tokens
- **Animations**: Framer Motion for smooth transitions
- **Charts**: Recharts for data visualization
- **Components**: shadcn/ui for consistent UI elements
- **Icons**: Lucide icons for visual elements

## 🚀 Getting Started

### Installation
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Project Structure
```
app/
├── page.tsx                    # Dashboard
├── inventory/
│   ├── phones/page.tsx        # Mobile phones inventory
│   └── accessories/page.tsx   # Accessories inventory
├── sales/
│   ├── pos/page.tsx          # Point of Sale interface
│   └── pending/page.tsx       # Pending payments
├── analytics/page.tsx         # Analytics and reports
├── settings/page.tsx          # User settings
└── admin/page.tsx             # Admin panel

components/
├── app-layout.tsx             # Main layout wrapper
├── sidebar.tsx                # Navigation sidebar
├── navbar.tsx                 # Top navigation
├── stat-card.tsx              # Dashboard metrics
├── inventory-summary.tsx       # Inventory overview
├── recent-sales.tsx           # Sales chart
└── product-form.tsx           # Product add/edit form
```

## ✨ Key Features

### Smart Navigation
- **Responsive Sidebar**: Collapsible on mobile, sticky on desktop
- **Active Route Highlighting**: Current page is highlighted in navigation
- **Quick Access**: All major sections accessible from any page
- **Mobile-Friendly**: Touch-friendly navigation for mobile users

### Real-time Data Management
- **Instant Updates**: Products, sales, and inventory update in real-time
- **Search Functionality**: Filter products and users instantly
- **Status Indicators**: Visual badges for stock levels and payment status
- **Animations**: Smooth transitions for better UX

### Business Insights
- **Revenue Tracking**: Monitor daily, weekly, and monthly revenue
- **Profit Analysis**: Track profit margins and trends
- **Sales Patterns**: Understand which products are best sellers
- **Customer Management**: Track pending payments and customer info

## 🎯 Use Cases

1. **Daily Operations**: Quick product lookups and fast checkout via POS
2. **Inventory Control**: Real-time stock management and reorder alerts
3. **Sales Analysis**: Track performance with detailed charts and reports
4. **Payment Collection**: Follow up on pending payments with ease
5. **Team Management**: Manage staff and admin access controls

## 🔐 Security Features

- **Session Management**: Configurable session timeout
- **Two-Factor Authentication**: Optional 2FA for enhanced security
- **Role-based Access**: Different user roles for varied permissions
- **Data Validation**: Form validation and input sanitization

## 📊 Analytics Capabilities

- Monthly revenue and profit trends
- Sales distribution by product category
- Top-performing products ranking
- Daily sales performance tracking
- Detailed transaction history

## 🌟 User Experience

- **Smooth Animations**: Framer Motion for polished interactions
- **Responsive Design**: Works on all device sizes
- **Dark Mode Support**: Comfortable viewing in low-light conditions
- **Quick Actions**: One-click operations for common tasks
- **Intuitive Interface**: Clear visual hierarchy and organization

## 📝 Notes

- All data is managed in component state (can be connected to a backend)
- Charts use Recharts for interactive visualization
- Forms include validation and error handling
- Mobile phones inventory includes storage and color variations
- Payment tracking includes customer information and overdue alerts

## 🔄 Future Enhancements

- Backend integration with API
- Database persistence
- User authentication
- Email notifications
- SMS alerts for pending payments
- Barcode scanning for POS
- Multi-store support
- Advanced reporting and exports
