'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { History, DollarSign, ShoppingBag, Download, Filter, Search, ArrowRight, User } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useStoreHydration } from '@/hooks/use-store-hydration';
import { format, subWeeks, subMonths, isAfter } from 'date-fns';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

export default function SalesHistoryPage() {
  const { sales, adminSettings } = useStore();
  const isHydrated = useStoreHydration();
  const [timeFilter, setTimeFilter] = useState<'all' | 'week' | 'month' | '6months' | 'year'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter sales based on time and search
  const filteredSales = useMemo(() => {
    let result = [...sales];

    // Time filtering
    if (timeFilter !== 'all') {
      const now = new Date();
      let threshold: Date;
      switch (timeFilter) {
        case 'week': threshold = subWeeks(now, 1); break;
        case 'month': threshold = subMonths(now, 1); break;
        case '6months': threshold = subMonths(now, 6); break;
        case 'year': threshold = subMonths(now, 12); break;
        default: threshold = new Date(0);
      }
      result = result.filter(s => isAfter(new Date(s.timestamp), threshold));
    }

    // Search filtering
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => 
        s.customerName?.toLowerCase().includes(q) || 
        s.id.toLowerCase().includes(q) ||
        s.items.some(item => item.name.toLowerCase().includes(q))
      );
    }

    return result.sort((a, b) => b.timestamp - a.timestamp);
  }, [sales, timeFilter, searchQuery]);

  const handleExportCSV = () => {
    if (filteredSales.length === 0) {
      toast.error('No sales data to export');
      return;
    }

    const headers = ['Order ID', 'Customer', 'Date', 'Items', 'Subtotal', 'Tax', 'Discount', 'Total', 'Payment Method'].join(',');
    const rows = filteredSales.map(s => [
      `#ORD-${s.id.slice(-6)}`,
      s.customerName || 'Walk-in',
      format(new Date(s.timestamp), 'yyyy-MM-dd HH:mm'),
      s.items.map(i => `${i.quantity}x ${i.name}`).join('; '),
      s.subtotal.toFixed(2),
      s.tax.toFixed(2),
      s.discount.toFixed(2),
      s.total.toFixed(2),
      s.paymentMethod.toUpperCase()
    ].map(field => `"${field}"`).join(','));

    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `sales_history_${format(new Date(), 'yyyy_MM_dd')}.csv`);
    link.click();
    
    toast.success('Sales history exported successfully');
  };

  if (!isHydrated) return null;

  const totalRevenue = filteredSales.reduce((sum, s) => sum + s.total, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-foreground uppercase tracking-tight">Sales History</h1>
          <p className="text-muted-foreground mt-1">Detailed record of all transactions</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex bg-muted rounded-xl p-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'week', label: 'Week' },
              { id: 'month', label: 'Month' },
              { id: '6months', label: '6M' },
              { id: 'year', label: 'Year' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setTimeFilter(f.id as any)}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  timeFilter === f.id ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <button 
            onClick={handleExportCSV}
            className="h-11 px-4 rounded-xl bg-foreground text-background hover:opacity-90 transition-opacity flex items-center gap-2 font-bold text-xs uppercase tracking-tight"
          >
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary p-8 border-none shadow-xl shadow-primary/20 relative overflow-hidden group">
          <div className="relative z-10 text-primary-foreground">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Total Revenue</p>
            <p className="text-4xl font-black">{adminSettings.currency}{totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
          <DollarSign size={120} className="absolute -right-8 -bottom-8 text-white/10 rotate-12 group-hover:scale-110 transition-transform duration-500" />
        </Card>

        <Card className="bg-card p-8 border-none shadow-xl shadow-primary/5 flex flex-col justify-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Total Sales</p>
          <p className="text-4xl font-black text-foreground">{filteredSales.length}</p>
        </Card>

        <Card className="bg-card p-8 border-none shadow-xl shadow-primary/5 flex flex-col justify-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Avg. Order Value</p>
          <p className="text-4xl font-black text-blue-600">
            {adminSettings.currency}{filteredSales.length > 0 ? (totalRevenue / filteredSales.length).toFixed(2) : '0.00'}
          </p>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <Input
          placeholder="Search by Order ID, Customer, or Product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-14 pl-12 bg-card border-none shadow-xl shadow-primary/5 text-lg placeholder:text-muted-foreground/50 rounded-2xl"
        />
      </div>

      {/* History Table */}
      <Card className="border-none shadow-xl shadow-primary/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Order ID</th>
                <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Customer</th>
                <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Date & Time</th>
                <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Items</th>
                <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Method</th>
                <th className="px-6 py-5 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground uppercase">#ORD-{sale.id.slice(-6)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary uppercase">
                        {(sale.customerName || 'W').charAt(0)}
                      </div>
                      <span className="font-bold text-foreground">{sale.customerName || 'Walk-in Customer'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground font-medium">
                    {format(new Date(sale.timestamp), 'MMM dd, yyyy • hh:mm a')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      {sale.items.map((item, idx) => (
                        <span key={idx} className="text-xs text-muted-foreground flex items-center gap-1">
                          <ShoppingBag size={10} />
                          {item.quantity}x {item.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      sale.paymentMethod === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {sale.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-black text-foreground">
                    {adminSettings.currency}{sale.total.toFixed(2)}
                  </td>
                </tr>
              ))}
              {filteredSales.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3 text-muted-foreground">
                      <History size={48} className="opacity-20" />
                      <p className="font-medium italic">No sales history found matching your criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
