'use client';

import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useStore } from '@/lib/store';
import { useStoreHydration } from '@/hooks/use-store-hydration';

const revenueData = [
  { month: 'Jan', revenue: 12000, profit: 4000 },
  { month: 'Feb', revenue: 19000, profit: 7000 },
  { month: 'Mar', revenue: 15000, profit: 6000 },
  { month: 'Apr', revenue: 22000, profit: 9000 },
  { month: 'May', revenue: 28000, profit: 12000 },
  { month: 'Jun', revenue: 32000, profit: 14000 },
];

const salesByCategory = [
  { name: 'iPhones', value: 35 },
  { name: 'Samsung', value: 25 },
  { name: 'Google', value: 15 },
  { name: 'Accessories', value: 25 },
];

const topProducts = [
  { name: 'iPhone 15 Pro', sales: 245 },
  { name: 'Samsung S24', sales: 189 },
  { name: 'Google Pixel 8', sales: 134 },
  { name: 'Screen Protectors', sales: 456 },
  { name: 'USB Chargers', sales: 312 },
];

const COLORS = ['#eb6b3b', '#5b6ae8', '#16a34a', '#f59e0b'];

export default function AnalyticsPage() {
  const { adminSettings } = useStore();
  const isHydrated = useStoreHydration();

  if (!isHydrated) return null;

  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 space-y-6"
      >
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground mt-1">Monitor your business performance</p>
        </div>

        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-card">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Monthly Revenue & Profit</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart 
                  data={revenueData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  barGap={8}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis
                    dataKey="month"
                    stroke="var(--color-muted-foreground)"
                    style={{ fontSize: '12px', fontWeight: 'bold' }}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis
                    stroke="var(--color-muted-foreground)"
                    style={{ fontSize: '12px' }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${adminSettings.currency}${value / 1000}k`}
                  />
                  <Tooltip
                    cursor={{ fill: 'var(--color-muted)', opacity: 0.1 }}
                    contentStyle={{
                      backgroundColor: 'var(--color-background)',
                      border: `1px solid var(--color-border)`,
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Legend 
                    verticalAlign="top" 
                    align="right" 
                    iconType="circle"
                    wrapperStyle={{ paddingBottom: '20px' }}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="var(--color-chart-1)" 
                    name="Revenue" 
                    radius={[6, 6, 0, 0]}
                    barSize={30}
                  />
                  <Bar 
                    dataKey="profit" 
                    fill="var(--color-chart-2)" 
                    name="Profit" 
                    radius={[6, 6, 0, 0]}
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales by Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Sales by Category</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={salesByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name} ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {salesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-card">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Top Selling Products</h2>
                <div className="space-y-4">
                  {topProducts.map((product, i) => (
                    <motion.div
                      key={product.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="flex items-center justify-between pb-3 border-b border-border last:border-b-0"
                    >
                      <span className="text-sm text-foreground">{product.name}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-muted rounded-full h-2">
                          <motion.div
                            className="bg-primary h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(product.sales / 456) * 100}%` }}
                            transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-foreground w-12 text-right">
                          {product.sales}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Sales Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-card">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Daily Sales Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis
                    dataKey="month"
                    stroke="var(--color-muted-foreground)"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis
                    stroke="var(--color-muted-foreground)"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-background)',
                      border: `1px solid var(--color-border)`,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-chart-1)"
                    strokeWidth={3}
                    dot={{ fill: 'var(--color-chart-1)', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </motion.div>
  );
}

