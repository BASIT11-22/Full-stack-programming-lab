'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { History, DollarSign, ArrowUpRight, Filter, Download, Calendar } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useStoreHydration } from '@/hooks/use-store-hydration';
import { format, subWeeks, subMonths, isAfter } from 'date-fns';
import { toast } from 'sonner';

export default function SubscriptionHistoryPage() {
  const { owners, adminSettings } = useStore();
  const isHydrated = useStoreHydration();
  const [timeFilter, setTimeFilter] = useState<'all' | 'week' | 'month' | '6months' | 'year'>('all');

  // Flatten and filter payments from owners
  const history = useMemo(() => {
    const rawHistory = owners.map(owner => ({
      id: owner.id,
      ownerName: owner.name,
      amount: owner.lastPaymentAmount || 0,
      date: owner.lastPaymentDate,
      method: 'Direct Deposit',
      status: 'Paid',
      timestamp: new Date(owner.lastPaymentDate)
    })).filter(h => h.amount > 0);

    if (timeFilter === 'all') return rawHistory;

    const now = new Date();
    let threshold: Date;

    switch (timeFilter) {
      case 'week': threshold = subWeeks(now, 1); break;
      case 'month': threshold = subMonths(now, 1); break;
      case '6months': threshold = subMonths(now, 6); break;
      case 'year': threshold = subMonths(now, 12); break;
      default: return rawHistory;
    }

    return rawHistory.filter(h => isAfter(h.timestamp, threshold));
  }, [owners, timeFilter]);

  const handleExportCSV = () => {
    if (history.length === 0) {
      toast.error('No data available to export');
      return;
    }

    const headers = ['Transaction ID', 'Owner Name', 'Date', 'Method', 'Status', `Amount (${adminSettings.currency})`].join(',');
    const rows = history.map(h => [
      `#TRX-${h.id.slice(-6)}`,
      h.ownerName,
      h.date,
      h.method,
      h.status,
      h.amount.toFixed(2)
    ].join(','));

    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `subscription_history_${format(new Date(), 'yyyy_MM_dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Subscription history exported successfully');
  };

  if (!isHydrated) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground uppercase tracking-tight">Payment Ledger</h1>
          <p className="text-muted-foreground mt-1">Audit trail of all license subscriptions</p>
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
            <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Total Collected</p>
            <p className="text-4xl font-black">{adminSettings.currency}{history.reduce((sum, h) => sum + h.amount, 0).toLocaleString()}</p>
          </div>
          <DollarSign size={120} className="absolute -right-8 -bottom-8 text-white/10 rotate-12 group-hover:scale-110 transition-transform duration-500" />
        </Card>

        <Card className="bg-card p-8 border-none shadow-xl shadow-primary/5 flex flex-col justify-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Active Licenses</p>
          <p className="text-4xl font-black text-foreground">{owners.filter(o => o.subscriptionStatus === 'active').length}</p>
        </Card>

        <Card className="bg-card p-8 border-none shadow-xl shadow-primary/5 flex flex-col justify-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Pending Renewals</p>
          <p className="text-4xl font-black text-orange-600">{owners.filter(o => o.subscriptionStatus === 'pending').length}</p>
        </Card>
      </div>

      {/* Ledger Table */}
      <Card className="border-none shadow-xl shadow-primary/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Transaction ID</th>
                <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Owner / Shop</th>
                <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Date</th>
                <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Method</th>
                <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="px-6 py-5 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {history.map((tx) => (
                <tr key={tx.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground uppercase">#TRX-{tx.id.slice(-6)}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-foreground">{tx.ownerName}</div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground font-medium">{tx.date}</td>
                  <td className="px-6 py-4 text-muted-foreground font-medium">{tx.method}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest">
                      <ArrowUpRight size={12} />
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-black text-foreground">{adminSettings.currency}{tx.amount.toFixed(2)}</td>
                </tr>
              ))}
              {history.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3 text-muted-foreground">
                      <History size={48} className="opacity-20" />
                      <p className="font-medium italic">No payment history available yet.</p>
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
