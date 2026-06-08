'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
} from 'lucide-react';
import { ProductForm } from '@/components/product-form';
import { useStore, Product } from '@/lib/store';
import { toast } from 'sonner';
import { useStoreHydration } from '@/hooks/use-store-hydration';

export default function AccessoriesPage() {
  const { products, addProduct, updateProduct, deleteProduct, adminSettings } = useStore();
  const isHydrated = useStoreHydration();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const accessories = products.filter(p => p.category === 'accessory');

  const filteredAccessories = accessories.filter((acc) =>
    acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    acc.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = async (data: any) => {
    try {
      if (editingId) {
        await updateProduct(editingId, data);
        toast.success('Accessory updated successfully');
      } else {
        await addProduct({ ...data, category: 'accessory' });
        toast.success('Accessory added successfully');
      }
      setShowForm(false);
      setEditingId(null);
    } catch (error) {
      toast.error('Failed to save accessory');
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this accessory?')) {
      deleteProduct(id);
      toast.success('Accessory deleted successfully');
    }
  };

  if (!isHydrated) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Accessories Inventory</h1>
          <p className="text-muted-foreground mt-1">Manage phone accessories and peripherals</p>
        </div>
        <Button
          onClick={() => {
            setEditingId(null);
            setShowForm(true);
          }}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-11 px-6 shadow-lg shadow-primary/20"
        >
          <Plus size={18} />
          Add Accessory
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 bg-card border-border/50">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
          <Input
            type="text"
            placeholder="Search by name, brand or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 bg-background"
          />
        </div>
      </Card>

      {/* Form Modal */}
      {showForm && (
        <ProductForm
          type="accessory"
          editingId={editingId}
          onClose={() => {
            setShowForm(false);
            setEditingId(null);
          }}
          onSave={handleSave}
          initialData={editingId ? accessories.find(p => p.id === editingId) : undefined}
        />
      )}

      {/* Table */}
      <Card className="bg-card overflow-hidden border-border/50 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Product Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Brand / Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Stock Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAccessories.map((acc, i) => (
                <motion.tr
                  key={acc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-muted/20 transition-colors group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded bg-accent/10 flex items-center justify-center text-accent font-bold text-xs mr-3">
                        {acc.name.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-foreground">{acc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-foreground">{acc.brand}</div>
                    <div className="text-[10px] text-muted-foreground capitalize">{acc.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-primary">{adminSettings.currency}{acc.price}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        acc.quantity > 20 ? 'bg-green-500' : acc.quantity > 0 ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span className={`text-xs font-bold ${
                        acc.quantity > 20 ? 'text-green-600' : acc.quantity > 0 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {acc.quantity} in stock
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setEditingId(acc.id);
                          setShowForm(true);
                        }}
                        className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary"
                      >
                        <Edit2 size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(acc.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAccessories.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-muted-foreground" size={24} />
            </div>
            <h3 className="text-lg font-bold text-foreground">No accessories found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or add a new accessory.</p>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
