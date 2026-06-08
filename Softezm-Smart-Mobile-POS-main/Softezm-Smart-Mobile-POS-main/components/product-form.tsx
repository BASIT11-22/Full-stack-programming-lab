'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';
import { useStore } from '@/lib/store';

interface ProductFormProps {
  type: 'phone' | 'accessory';
  editingId: string | null;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export function ProductForm({ type, editingId, onClose, onSave, initialData }: ProductFormProps) {
  const { adminSettings } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    price: '',
    quantity: '',
    storage: '',
    color: '',
    category: type,
    sku: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        brand: initialData.brand || '',
        model: initialData.model || '',
        price: initialData.price?.toString() || '',
        quantity: initialData.quantity?.toString() || '',
        storage: initialData.storage || '',
        color: initialData.color || '',
        category: initialData.category || type,
        sku: initialData.sku || '',
      });
    }
  }, [initialData, type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl"
        >
          <Card className="bg-card border-border shadow-2xl overflow-hidden rounded-2xl">
            <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {editingId ? 'Edit Product' : 'Add New Product'}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5 capitalize">{type} information</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-xl transition-colors"
              >
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Name *</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="iPhone 15 Pro"
                    className="h-11 bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Brand *</label>
                  <Input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                    placeholder="Apple"
                    className="h-11 bg-background"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Model *</label>
                  <Input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    required
                    placeholder="A3089"
                    className="h-11 bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">SKU / Code</label>
                  <Input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="IPH-15P-256"
                    className="h-11 bg-background"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Price ({adminSettings.currency}) *</label>
                  <Input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value.replace(/[^0-9.]/g, '') }))}
                    required
                    placeholder="999.99"
                    className="h-11 bg-background font-bold text-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Quantity *</label>
                  <Input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    placeholder="0"
                    className="h-11 bg-background"
                  />
                </div>
              </div>

              {type === 'phone' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Storage</label>
                    <Input
                      type="text"
                      name="storage"
                      value={formData.storage}
                      onChange={handleChange}
                      placeholder="256GB"
                      className="h-11 bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Color</label>
                    <Input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      placeholder="Titanium Black"
                      className="h-11 bg-background"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full h-11 px-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  >
                    <option value="accessory">General Accessory</option>
                    <option value="chargers">Chargers</option>
                    <option value="cables">Cables</option>
                    <option value="cases">Cases</option>
                    <option value="protectors">Screen Protectors</option>
                    <option value="earbuds">Earbuds</option>
                  </select>
                </div>
              )}

              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 h-12 rounded-xl font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20"
                >
                  {editingId ? 'Save Changes' : 'Add Product'}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
