'use client';

import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';

export function InventorySummary() {
  const { products } = useStore();

  const categories = products
    .sort((a, b) => a.quantity - b.quantity)
    .slice(0, 5)
    .map(p => ({
      id: p.id,
      name: p.name,
      stock: p.quantity,
      status: p.quantity > 10 ? 'In Stock' : p.quantity > 0 ? 'Low Stock' : 'Critical'
    }));

  return (
    <Card className="bg-card border-border/50 shadow-lg">
      <div className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Stock Status</h3>

        <div className="space-y-4">
          {categories.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between pb-4 border-b border-border/50 last:border-b-0 last:pb-0"
            >
              <div>
                <p className="text-sm font-bold text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.stock} units left</p>
              </div>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold ${
                  item.status === 'In Stock'
                    ? 'bg-green-100 text-green-700'
                    : item.status === 'Low Stock'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                }`}
              >
                {item.status}
              </motion.span>
            </motion.div>
          ))}
          {products.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-8">No inventory data</p>
          )}
        </div>
      </div>
    </Card>
  );
}
