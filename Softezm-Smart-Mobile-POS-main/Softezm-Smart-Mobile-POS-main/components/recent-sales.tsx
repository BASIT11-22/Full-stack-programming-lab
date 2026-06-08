'use client';

import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useStore } from '@/lib/store';
import { format } from 'date-fns';

export function RecentSales() {
  const { sales, adminSettings } = useStore();

  // Generate chart data from last 7 days of sales
  const chartData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return format(d, 'EEE');
    }).reverse();

    return last7Days.map(day => {
      const daySales = sales.filter(s => format(new Date(s.timestamp), 'EEE') === day);
      return {
        date: day,
        sales: daySales.length,
        revenue: daySales.reduce((sum, s) => sum + s.total, 0)
      };
    });
  }, [sales]);

  const recentTransactions = sales.slice(0, 5);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="bg-card border-border/50 shadow-lg">
          <div className="p-6">
            <h3 className="text-lg font-bold text-foreground mb-6">Sales Trend (Last 7 Days)</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis
                    dataKey="date"
                    stroke="var(--color-muted-foreground)"
                    style={{ fontSize: '12px', fontWeight: 'bold' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="var(--color-muted-foreground)"
                    style={{ fontSize: '12px', fontWeight: 'bold' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${adminSettings.currency}${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-background)',
                      border: `1px solid var(--color-border)`,
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    }}
                    labelStyle={{ color: 'var(--color-foreground)', fontWeight: 'bold' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    strokeWidth={4}
                    dot={{ fill: 'hsl(var(--primary))', r: 4, strokeWidth: 2, stroke: 'white' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="bg-card border-border/50 shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Recent Transactions</h3>
            <div className="space-y-4">
              {recentTransactions.map((sale, i) => (
                <div key={sale.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs">
                      {sale.paymentMethod === 'cash' ? 'C$' : 'CC'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Order #{sale.id.split('-')[1]}</p>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
                        {format(new Date(sale.timestamp), 'MMM dd, hh:mm a')} • {sale.items.length} items
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-foreground">{adminSettings.currency}{sale.total.toFixed(2)}</p>
                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest">{sale.paymentMethod}</p>
                  </div>
                </div>
              ))}
              {recentTransactions.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-sm text-muted-foreground">No recent sales found</p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
