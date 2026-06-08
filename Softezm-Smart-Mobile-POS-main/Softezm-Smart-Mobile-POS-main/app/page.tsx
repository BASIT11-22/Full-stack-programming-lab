'use client';

import { StatCard } from '@/components/stat-card';
import { InventorySummary } from '@/components/inventory-summary';
import { RecentSales } from '@/components/recent-sales';
import { motion } from 'framer-motion';
import {
  DollarSign,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStoreHydration } from '@/hooks/use-store-hydration';

export default function Dashboard() {
  const { products, sales, adminSettings, currentUser } = useStore();
  const isHydrated = useStoreHydration();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && currentUser?.role === 'admin') {
      router.push('/admin');
    }
  }, [isHydrated, currentUser, router]);

  const stats = useMemo(() => {
    if (!isHydrated) return [];
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
    const totalSales = sales.length;
    const phonesInStock = products
      .filter(p => p.category === 'phone')
      .reduce((sum, p) => sum + p.quantity, 0);
    const avgOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;
    const lowStockCount = products.filter(p => p.quantity < 5).length;

    return [
      {
        title: 'Total Revenue',
        value: `${adminSettings.currency}${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        change: sales.length > 0 ? '+ Live' : 'No sales yet',
        icon: DollarSign,
        color: 'from-orange-400 to-red-500',
      },
      {
        title: 'Total Sales',
        value: totalSales.toString(),
        change: 'Transactions',
        icon: ShoppingCart,
        color: 'from-blue-400 to-cyan-500',
      },
      {
        title: 'Phones in Stock',
        value: phonesInStock.toString(),
        change: `${products.length} types`,
        icon: Smartphone,
        color: 'from-green-400 to-emerald-500',
      },
      {
        title: 'Avg. Order Value',
        value: `${adminSettings.currency}${avgOrderValue.toFixed(2)}`,
        change: 'Per sale',
        icon: TrendingUp,
        color: 'from-purple-400 to-pink-500',
      },
      {
        title: 'Low Stock Alerts',
        value: lowStockCount.toString(),
        change: lowStockCount > 0 ? 'Urgent' : 'All good',
        icon: AlertCircle,
        color: lowStockCount > 0 ? 'from-yellow-400 to-orange-500' : 'from-gray-400 to-gray-500',
      },
    ];
  }, [products, sales]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  if (!isHydrated) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-6 max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Real-time overview of your POS activity</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={itemVariants}>
            <StatCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <RecentSales />
        </motion.div>
        <motion.div variants={itemVariants}>
          <InventorySummary />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

