'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  Check,
  X,
  DollarSign,
  Calendar,
  User,
  Phone,
  Clock,
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { useStoreHydration } from '@/hooks/use-store-hydration';
import { toast } from 'sonner';

export default function PendingPaymentsPage() {
  const { sales, updateSaleStatus, makePartialPayment, adminSettings } = useStore();
  const isHydrated = useStoreHydration();
  const [payingId, setPayingId] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const pendingSales = sales.filter(sale => sale.paymentMethod === 'pending');

  const handleCollect = (id: string) => {
    updateSaleStatus(id, 'cash');
    toast.success('Payment marked as paid!');
  };

  const handlePartialPayment = async (id: string) => {
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsSubmitting(true);
    try {
      await makePartialPayment(id, amount);
      toast.success(`Deducted ${adminSettings.currency}${amount} from pending balance`);
      setPayingId(null);
      setPaymentAmount('');
    } catch (error) {
      toast.error('Failed to update payment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPending = pendingSales.reduce((sum, p) => sum + (p.pendingAmount || p.total), 0);
  
  if (!isHydrated) return null;

  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 space-y-6 max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-foreground uppercase tracking-tight">Pending Payments</h1>
            <p className="text-muted-foreground mt-1">Manage and track outstanding customer credits</p>
          </div>
          <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm">
            <Clock size={18} />
            {pendingSales.length} ACTIVE PENDING
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-card p-8 border-none shadow-xl shadow-primary/5 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Total Outstanding</p>
              <p className="text-5xl font-black text-primary">${totalPending.toFixed(2)}</p>
            </div>
            <DollarSign size={120} className="absolute -right-8 -bottom-8 text-primary/5 rotate-12" />
          </Card>

          <Card className="bg-card p-8 border-none shadow-xl shadow-primary/5 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Pending Transactions</p>
              <p className="text-5xl font-black text-foreground">{pendingSales.length}</p>
            </div>
            <User size={120} className="absolute -right-8 -bottom-8 text-foreground/5 -rotate-12" />
          </Card>
        </div>

        {/* Payments List */}
        <div className="space-y-4">
          {pendingSales.length === 0 ? (
            <Card className="bg-card p-20 text-center border-dashed border-2 border-border/50">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">No Pending Payments</h3>
              <p className="text-muted-foreground mt-2">All your accounts are clear! Great job.</p>
            </Card>
          ) : (
            pendingSales.map((sale, i) => (
              <motion.div
                key={sale.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-card overflow-hidden hover:shadow-2xl transition-all border-none shadow-lg group">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-orange-50 dark:bg-orange-950/20 p-6 md:w-64 flex flex-col justify-center border-r border-border/50">
                      <p className="text-[10px] font-black uppercase tracking-widest text-orange-600 mb-1">Customer</p>
                      <h3 className="text-xl font-black text-foreground uppercase truncate">{sale.customerName || 'Unknown'}</h3>
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <Calendar size={14} />
                        Due: <span className="font-bold text-orange-600">{sale.dueDate || 'No Date'}</span>
                      </p>
                    </div>

                    <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Items Summary</p>
                        <p className="text-sm font-medium text-foreground line-clamp-2">
                          {sale.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Pending Amount</p>
                        <p className="text-3xl font-black text-primary">{adminSettings.currency}{(sale.pendingAmount || sale.total).toFixed(2)}</p>
                      </div>

                      <div className="flex flex-col gap-2">
                        {payingId === sale.id ? (
                          <div className="flex gap-2 items-center">
                            <Input
                              type="number"
                              placeholder="Amount"
                              value={paymentAmount}
                              onChange={(e) => setPaymentAmount(e.target.value)}
                              className="w-24 h-10 bg-background"
                            />
                            <Button 
                              size="sm"
                              disabled={isSubmitting}
                              onClick={() => handlePartialPayment(sale.id)}
                              className="h-10 px-3"
                            >
                              Pay
                            </Button>
                            <Button 
                              size="sm"
                              variant="ghost" 
                              onClick={() => setPayingId(null)}
                              className="h-10 px-2"
                            >
                              <X size={16} />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleCollect(sale.id)}
                              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 h-10"
                            >
                              Full Paid
                            </Button>
                            <Button
                              onClick={() => setPayingId(sale.id)}
                              variant="outline"
                              className="flex-1 font-bold rounded-xl h-10"
                            >
                              Installment
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
  );
}

