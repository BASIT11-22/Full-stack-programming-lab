'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Search, X, UserPlus, Mail, Phone, Shield } from 'lucide-react';
import { useStore, Owner } from '@/lib/store';
import { useStoreHydration } from '@/hooks/use-store-hydration';
import { toast } from 'sonner';

export default function OwnersManagementPage() {
  const { owners, addOwner, updateOwner, deleteOwner, adminSettings } = useStore();
  const isHydrated = useStoreHydration();

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Owner, 'id'>>({
    name: '',
    email: '',
    password: '',
    phone: '',
    subscriptionStatus: 'active',
    joinDate: new Date().toISOString().split('T')[0],
    lastPaymentDate: new Date().toISOString().split('T')[0],
    lastPaymentAmount: 0,
    nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    nextPaymentAmount: 50,
  });

  if (!isHydrated) return null;

  const filteredOwners = owners.filter(
    (owner) =>
      owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      owner.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenForm = (owner?: Owner) => {
    if (owner) {
      setFormData({
        name: owner.name,
        email: owner.email,
        password: owner.password || '',
        phone: owner.phone,
        subscriptionStatus: owner.subscriptionStatus,
        joinDate: owner.joinDate,
        lastPaymentDate: owner.lastPaymentDate,
        lastPaymentAmount: owner.lastPaymentAmount,
        nextPaymentDate: owner.nextPaymentDate,
        nextPaymentAmount: owner.nextPaymentAmount,
      });
      setEditingId(owner.id);
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        phone: '',
        subscriptionStatus: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        lastPaymentDate: new Date().toISOString().split('T')[0],
        lastPaymentAmount: 0,
        nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        nextPaymentAmount: 50,
      });
      setEditingId(null);
    }
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateOwner(editingId, formData);
        toast.success('Owner updated successfully');
      } else {
        await addOwner(formData);
        toast.success('New owner onboarded!');
      }
      setShowForm(false);
    } catch (error) {
      toast.error('Operation failed. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground uppercase tracking-tight">Owners Directory</h1>
          <p className="text-muted-foreground mt-1">Manage software licensees and accounts</p>
        </div>
        <Button
          onClick={() => handleOpenForm()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-12 px-6 rounded-xl font-bold uppercase tracking-tight shadow-lg shadow-primary/20"
        >
          <UserPlus size={18} />
          Onboard New Owner
        </Button>
      </div>

      {/* Search */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" size={18} />
        <Input
          type="text"
          placeholder="Search by name, email or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 h-14 bg-card border-none shadow-xl shadow-primary/5 rounded-2xl focus-visible:ring-primary"
        />
      </div>

      {/* Owners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOwners.map((owner, i) => (
          <motion.div
            key={owner.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="bg-card p-6 border-none shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-all group relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black text-xl group-hover:scale-110 transition-transform">
                  {owner.name.charAt(0)}
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenForm(owner)} className="p-2 bg-muted hover:bg-primary/10 hover:text-primary rounded-xl transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => deleteOwner(owner.id)} className="p-2 bg-muted hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-black text-foreground uppercase tracking-tight truncate">{owner.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Mail size={12} />
                    {owner.email}
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Status</p>
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      owner.subscriptionStatus === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {owner.subscriptionStatus}
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Plan</p>
                    <span className="text-xs font-bold text-foreground">{adminSettings.currency}{owner.nextPaymentAmount}/mo</span>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 -bottom-4 text-foreground/5 transform rotate-12 group-hover:rotate-6 transition-transform duration-500">
                <Shield size={100} />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredOwners.length === 0 && (
        <Card className="bg-card p-20 text-center border-dashed border-2 border-border/50 rounded-3xl">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <UserPlus size={40} className="text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">No Owners Found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search or onboard a new owner.</p>
        </Card>
      )}

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-xl"
            >
              <Card className="bg-card border-none shadow-2xl overflow-hidden rounded-3xl">
                <div className="bg-primary p-8 text-primary-foreground relative">
                  <h2 className="text-2xl font-black uppercase tracking-tight">
                    {editingId ? 'Edit Profile' : 'New Onboarding'}
                  </h2>
                  <p className="text-primary-foreground/80 text-sm mt-1">Configure owner credentials and plan</p>
                  <button onClick={() => setShowForm(false)} className="absolute top-8 right-8 p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Owner Name</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="h-12 bg-background border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Phone Number</label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="h-12 bg-background border-border/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12 bg-background border-border/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Password</label>
                    <Input
                      type="text"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      className="h-12 bg-background border-border/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Subscription Status</label>
                      <select
                        value={formData.subscriptionStatus}
                        onChange={(e) => setFormData({ ...formData, subscriptionStatus: e.target.value as any })}
                        className="w-full h-12 bg-background border border-border/50 rounded-xl px-4 text-sm font-bold uppercase"
                      >
                        <option value="active">Active</option>
                        <option value="expired">Expired</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Next Payment Date</label>
                      <Input
                        type="date"
                        value={formData.nextPaymentDate}
                        onChange={(e) => setFormData({ ...formData, nextPaymentDate: e.target.value })}
                        required
                        className="h-12 bg-background border-border/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Last Amount Paid</label>
                      <Input
                        type="text"
                        value={formData.lastPaymentAmount}
                        onChange={(e) => setFormData({ ...formData, lastPaymentAmount: Number(e.target.value.replace(/[^0-9.]/g, '')) })}
                        required
                        className="h-12 bg-background border-border/50 font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Next Payment Amount</label>
                      <Input
                        type="text"
                        value={formData.nextPaymentAmount}
                        onChange={(e) => setFormData({ ...formData, nextPaymentAmount: Number(e.target.value.replace(/[^0-9.]/g, '')) })}
                        required
                        className="h-12 bg-background border-border/50 font-bold"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="button" onClick={() => setShowForm(false)} variant="outline" className="flex-1 h-12 rounded-xl font-bold uppercase tracking-tight">Cancel</Button>
                    <Button type="submit" className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl uppercase tracking-tight">
                      {editingId ? 'Update Owner' : 'Complete Onboarding'}
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
