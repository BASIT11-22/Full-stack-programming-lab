'use client';

import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Users, DollarSign, Calendar, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useStoreHydration } from '@/hooks/use-store-hydration';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminOverviewPage() {
  const { owners, sales, adminSettings, currentUser } = useStore();
  const isHydrated = useStoreHydration();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && currentUser?.role !== 'admin') {
      router.push('/');
    }
  }, [isHydrated, currentUser, router]);

  if (!isHydrated) return null;

  const totalOwners = owners.length;
  const activeOwners = owners.filter(o => o.subscriptionStatus === 'active').length;
  const totalRevenue = owners.reduce((sum, o) => sum + o.lastPaymentAmount, 0);
  const pendingRevenue = owners.reduce((sum, o) => sum + (o.subscriptionStatus === 'pending' ? o.nextPaymentAmount : 0), 0);

  const stats = [
    { name: 'Total Owners', value: totalOwners, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100', trend: '+12%', up: true },
    { name: 'Active Subscriptions', value: activeOwners, icon: Calendar, color: 'text-green-600', bg: 'bg-green-100', trend: '+5%', up: true },
    { name: 'Total Revenue', value: `${adminSettings.currency}${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-primary', bg: 'bg-primary/10', trend: '+18%', up: true },
    { name: 'Forecasted Revenue', value: `${adminSettings.currency}${pendingRevenue.toLocaleString()}`, icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-100', trend: '-2%', up: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-foreground uppercase tracking-tight">Admin Console</h1>
        <p className="text-muted-foreground mt-1">Enterprise-level oversight and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-6 border-none shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-all relative overflow-hidden group">
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{stat.name}</p>
                  <p className="text-3xl font-black text-foreground">{stat.value}</p>
                  <div className={`mt-2 inline-flex items-center gap-1 text-xs font-bold ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {stat.trend}
                    <span className="text-muted-foreground font-medium ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`p-4 ${stat.bg} rounded-2xl transition-transform group-hover:scale-110 duration-300`}>
                  <stat.icon className={stat.color} size={28} />
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 text-foreground/5 pointer-events-none transform rotate-12 group-hover:rotate-6 transition-transform duration-500">
                <stat.icon size={120} />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Owners Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Recent Onboardings</h2>
          <button className="text-xs font-black uppercase text-primary hover:underline">View All Owners</button>
        </div>
        <Card className="border-none shadow-xl shadow-primary/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Owner Name</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Joined</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Next Payment</th>
                  <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {owners.slice(0, 5).map((owner) => (
                  <tr key={owner.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-foreground">{owner.name}</div>
                      <div className="text-xs text-muted-foreground">{owner.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        owner.subscriptionStatus === 'active' ? 'bg-green-100 text-green-700' : 
                        owner.subscriptionStatus === 'expired' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {owner.subscriptionStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-muted-foreground">{owner.joinDate}</td>
                    <td className="px-6 py-4 text-sm font-medium text-muted-foreground">{owner.nextPaymentDate}</td>
                    <td className="px-6 py-4 text-right font-black text-foreground">{adminSettings.currency}{owner.nextPaymentAmount}</td>
                  </tr>
                ))}
                {owners.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground font-medium italic">
                      No owners onboarded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
