'use client';

import { useStore } from '@/lib/store';
import { useStoreHydration } from '@/hooks/use-store-hydration';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  AlertTriangle, 
  Clock, 
  Package, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { format } from 'date-fns';

export default function AlertsPage() {
  const { products, sales, owners, requests, currentUser } = useStore();
  const isHydrated = useStoreHydration();

  if (!isHydrated) return null;

  const isAdmin = currentUser?.role === 'admin';

  // Define alert type
  interface Alert {
    id: string;
    type: string;
    title: string;
    message: string;
    time: number;
    href: string;
    priority: 'high' | 'medium' | 'success' | 'low';
  }

  // Generate alerts
  const alerts: Alert[] = [];

  if (isAdmin) {
    // Admin Alerts: Pending Credential Requests
    const pendingReqs = requests.filter(r => r.status === 'pending');
    pendingReqs.forEach(req => {
      alerts.push({
        id: `req-${req.id}`,
        type: 'security',
        title: 'Security Request',
        message: `${req.ownerName} requested a credential change.`,
        time: req.timestamp,
        href: '/admin/requests',
        priority: 'high'
      });
    });

    // Admin Alerts: Pending/Expired Subscriptions
    const problematicOwners = owners.filter(o => o.subscriptionStatus !== 'active');
    problematicOwners.forEach(owner => {
      alerts.push({
        id: `sub-${owner.id}`,
        type: 'subscription',
        title: owner.subscriptionStatus === 'expired' ? 'Subscription Expired' : 'Payment Pending',
        message: `${owner.name}'s subscription needs attention.`,
        time: typeof owner.lastPaymentDate === 'string' ? Date.parse(owner.lastPaymentDate) : (owner.lastPaymentDate as any).getTime?.() || Date.now(),
        href: '/admin/owners',
        priority: owner.subscriptionStatus === 'expired' ? 'high' : 'medium'
      });
    });
  } else {
    // Owner Alerts: Low Stock
    const lowStock = products.filter(p => p.quantity < 5);
    lowStock.forEach(p => {
      alerts.push({
        id: `stock-${p.id}`,
        type: 'inventory',
        title: 'Low Stock Alert',
        message: `${p.name} is running low (${p.quantity} left).`,
        time: Date.now() - 3600000, // Simulated time
        href: p.category === 'phone' ? '/inventory/phones' : '/inventory/accessories',
        priority: p.quantity === 0 ? 'high' : 'medium'
      });
    });

    // Owner Alerts: Pending Payments
    const pendingSales = sales.filter(s => s.paymentMethod === 'pending');
    pendingSales.forEach(s => {
      alerts.push({
        id: `sale-${s.id}`,
        type: 'payment',
        title: 'Pending Payment',
        message: `Outstanding balance of Rs. ${s.pendingAmount} from ${s.customerName || 'Customer'}.`,
        time: s.timestamp,
        href: '/sales/pending',
        priority: 'medium'
      });
    });

    // Owner Alerts: Credential Request Status
    const myRequests = requests.filter(r => r.ownerId === currentUser?.id);
    myRequests.forEach(req => {
      if (req.status !== 'pending') {
        alerts.push({
          id: `myreq-${req.id}`,
          type: 'security',
          title: `Request ${req.status.charAt(0).toUpperCase() + req.status.slice(1)}`,
          message: `Your credential change request has been ${req.status}.`,
          time: req.timestamp + 86400000, // Simulated updated time
          href: '/settings',
          priority: req.status === 'approved' ? 'success' : 'medium'
        });
      }
    });
  }

  // Sort by time
  const sortedAlerts = alerts.sort((a, b) => b.time - a.time);

  const getIcon = (type: string, priority: string) => {
    if (priority === 'success') return <CheckCircle2 className="text-green-500" size={24} />;
    switch (type) {
      case 'inventory': return <Package className="text-orange-500" size={24} />;
      case 'payment': return <CreditCard className="text-blue-500" size={24} />;
      case 'security': return <ShieldAlert className="text-red-500" size={24} />;
      case 'subscription': return <AlertTriangle className="text-purple-500" size={24} />;
      default: return <Bell className="text-primary" size={24} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-8 max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
            <Bell className="text-primary" size={32} />
            Notifications
          </h1>
          <p className="text-muted-foreground uppercase text-xs font-bold tracking-widest ml-1">System alerts and activities</p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest">
          {sortedAlerts.length} New Alerts
        </div>
      </div>

      <div className="space-y-4">
        {sortedAlerts.length === 0 ? (
          <Card className="p-20 text-center border-dashed border-2 border-border bg-muted/20 rounded-[2rem]">
            <CheckCircle2 className="mx-auto text-green-500/20 mb-6" size={80} />
            <h3 className="text-xl font-black text-foreground uppercase tracking-tight">All Clear!</h3>
            <p className="text-muted-foreground font-bold uppercase text-xs tracking-widest mt-2">No urgent alerts requiring your attention</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence mode="popLayout">
              {sortedAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={alert.href}>
                    <Card className={`group relative overflow-hidden border-none shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-all p-6 rounded-[1.5rem] ${
                      alert.priority === 'high' ? 'bg-red-50/50 dark:bg-red-950/10' : 'bg-card'
                    }`}>
                      {/* Priority Indicator */}
                      {alert.priority === 'high' && (
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500" />
                      )}

                      <div className="flex items-center gap-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                          alert.priority === 'high' ? 'bg-red-100 dark:bg-red-900/20' : 'bg-muted/50'
                        }`}>
                          {getIcon(alert.type, alert.priority)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-black text-foreground uppercase tracking-tight truncate">
                              {alert.title}
                            </h3>
                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest shrink-0">
                              • {format(alert.time, 'hh:mm a')}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {alert.message}
                          </p>
                        </div>

                        <div className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1 duration-300">
                          <ArrowRight size={24} />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Suggestion Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none p-8 rounded-[2rem] relative overflow-hidden group">
          <div className="absolute -right-12 -bottom-12 opacity-5 group-hover:scale-110 transition-transform duration-700">
            <TrendingUp size={240} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-2">
              <h4 className="text-xl font-black text-foreground uppercase tracking-tight">Need to boost your sales?</h4>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Check your analytics for personalized insights</p>
            </div>
            <Link href="/analytics">
              <Button className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-black rounded-xl uppercase tracking-widest shadow-xl shadow-primary/20">
                View Analytics
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
