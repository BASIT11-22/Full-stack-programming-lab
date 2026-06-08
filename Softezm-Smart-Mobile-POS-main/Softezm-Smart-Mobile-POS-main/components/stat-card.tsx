'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  color: string;
}

export function StatCard({ title, value, change, icon: Icon, color }: StatCardProps) {
  const isPositive = change.startsWith('+');
  const isNegative = change.startsWith('-');
  const isUrgent = change === 'Urgent';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="relative overflow-hidden bg-card hover:shadow-lg transition-shadow">
        {/* Gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10`} />

        <div className="relative p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 bg-gradient-to-br ${color} rounded-lg`}>
              <Icon size={24} className="text-white" />
            </div>
            {isPositive && (
              <div className="flex items-center gap-1 text-green-600 text-xs font-semibold">
                <TrendingUp size={14} />
                {change}
              </div>
            )}
            {isNegative && (
              <div className="flex items-center gap-1 text-red-600 text-xs font-semibold">
                <TrendingDown size={14} />
                {change}
              </div>
            )}
            {isUrgent && (
              <div className="text-red-600 text-xs font-semibold">{change}</div>
            )}
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
