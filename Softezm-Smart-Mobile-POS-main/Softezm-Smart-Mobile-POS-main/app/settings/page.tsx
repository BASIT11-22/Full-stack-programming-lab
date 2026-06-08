'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Lock, Mail, Sun, Moon, User, Store, Send, DollarSign } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useStoreHydration } from '@/hooks/use-store-hydration';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { adminSettings, updateAdminSettings, currentUser, addRequest, updateProfile } = useStore();
  const isHydrated = useStoreHydration();

  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    storeName: currentUser?.storeName || 'My Mobile Shop',
  });

  const [requestData, setRequestData] = useState({
    newEmail: '',
    newPassword: '',
    reason: '',
  });

  const [showRequestModal, setShowRequestModal] = useState(false);

  const handleProfileUpdate = () => {
    updateProfile({
      name: profileData.name,
      storeName: profileData.storeName,
    });
    toast.success('Profile details updated successfully');
  };

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser?.id) return;

    addRequest({
      ownerId: currentUser.id,
      ownerName: currentUser.name || 'Unknown Owner',
      newEmail: requestData.newEmail || undefined,
      newPassword: requestData.newPassword || undefined,
      reason: requestData.reason,
    });

    toast.success('Change request sent to Admin for approval');
    setShowRequestModal(false);
    setRequestData({ newEmail: '', newPassword: '', reason: '' });
  };

  const toggleTheme = (newTheme: 'light' | 'dark') => {
    updateAdminSettings({ theme: newTheme });
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    toast.success(`Theme switched to ${newTheme} mode`);
  };

  if (!isHydrated) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-8 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-foreground uppercase tracking-tight">Settings</h1>
        <p className="text-muted-foreground uppercase text-xs font-bold tracking-widest">Personalize your terminal experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appearance Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-card border-none shadow-xl shadow-primary/5 p-6 h-full">
            <h2 className="text-xl font-black text-foreground uppercase tracking-tight mb-6 flex items-center gap-2">
              <Sun className="text-primary" size={20} />
              Appearance
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => toggleTheme('light')}
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${
                  adminSettings.theme === 'light'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-950/20 rounded-xl flex items-center justify-center text-orange-600">
                  <Sun size={24} />
                </div>
                <span className="font-bold text-xs uppercase tracking-widest">Light</span>
              </button>
              <button
                onClick={() => toggleTheme('dark')}
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${
                  adminSettings.theme === 'dark'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="w-12 h-12 bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-400">
                  <Moon size={24} />
                </div>
                <span className="font-bold text-xs uppercase tracking-widest">Dark</span>
              </button>
            </div>
          </Card>
        </motion.div>

        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-card border-none shadow-xl shadow-primary/5 p-6 h-full space-y-6">
            <h2 className="text-xl font-black text-foreground uppercase tracking-tight mb-2 flex items-center gap-2">
              <User className="text-primary" size={20} />
              Profile Details
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Your Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="pl-10 h-11 bg-muted/30 border-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Store Name</label>
                <div className="relative">
                  <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    value={profileData.storeName}
                    onChange={(e) => setProfileData({ ...profileData, storeName: e.target.value })}
                    className="pl-10 h-11 bg-muted/30 border-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <Button onClick={handleProfileUpdate} className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl gap-2 shadow-lg shadow-primary/20">
                <Save size={18} />
                Save Changes
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Currency Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="bg-card border-none shadow-xl shadow-primary/5 p-6 h-full flex flex-col justify-between">
            <div className="space-y-6">
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight flex items-center gap-2">
                <DollarSign className="text-primary" size={20} />
                Currency
              </h2>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest leading-relaxed">
                Switching currency will automatically convert all product prices and sale records based on current exchange rates.
              </p>
            </div>

            <div className="mt-6">
              <select
                value={adminSettings.currency}
                onChange={(e) => {
                  updateAdminSettings({ currency: e.target.value });
                  toast.success(`Currency converted to ${e.target.value}`);
                }}
                className="w-full h-12 bg-muted/30 border-none rounded-xl px-4 text-xs font-black uppercase tracking-tight focus:ring-2 focus:ring-primary/20 outline-none"
              >
                <option value="Rs.">PKR (Rs.)</option>
                <option value="$">USD ($)</option>
                <option value="€">EUR (€)</option>
                <option value="£">GBP (£)</option>
                <option value="¥">JPY (¥)</option>
              </select>
            </div>
          </Card>
        </motion.div>

        {/* Security / Request Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-2"
        >
          <Card className="bg-gradient-to-br from-card to-muted/30 border-none shadow-xl p-8 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Lock size={120} />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-center md:text-left">
                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">Security & Credentials</h2>
                <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                  Email and Password updates require administrative review to ensure system integrity. 
                  Submit a request and our admin team will process it within 24 hours.
                </p>
              </div>

              <Button 
                onClick={() => setShowRequestModal(true)}
                className="h-14 px-8 bg-foreground text-background hover:bg-foreground/90 font-black rounded-2xl gap-3 shadow-2xl transition-transform hover:scale-105 active:scale-95"
              >
                <Lock size={20} />
                REQUEST CREDENTIAL CHANGE
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Footer info */}
      <div className="pt-10 text-center space-y-4">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-foreground uppercase tracking-[0.4em]">Software by Softezm Pvt.Ltd</p>
          <div className="text-[9px] text-muted-foreground font-bold space-y-0.5">
            <p>Contact: 03060250202 | Mail: info@softezm.com</p>
          </div>
        </div>
      </div>

      {/* Request Modal */}
      <AnimatePresence>
        {showRequestModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-lg"
            >
              <Card className="bg-card border-none shadow-2xl p-8 space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
                    <Send size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">Submit Change Request</h3>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mt-1">Admin Approval Required</p>
                </div>

                <form onSubmit={handleSendRequest} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">New Email (Optional)</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                        <Input
                          placeholder="new@email.com"
                          value={requestData.newEmail}
                          onChange={(e) => setRequestData({ ...requestData, newEmail: e.target.value })}
                          className="pl-10 h-11 bg-muted/30 border-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">New Password (Optional)</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-20" size={16} />
                        <PasswordInput
                          placeholder="••••••••"
                          value={requestData.newPassword}
                          onChange={(e) => setRequestData({ ...requestData, newPassword: e.target.value })}
                          className="pl-10 h-11 bg-muted/30 border-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Reason for Change</label>
                    <textarea
                      placeholder="Explain why you want to change your credentials..."
                      value={requestData.reason}
                      onChange={(e) => setRequestData({ ...requestData, reason: e.target.value })}
                      className="w-full min-h-[100px] p-4 bg-muted/30 rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all"
                      required
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowRequestModal(false)}
                      className="flex-1 h-12 rounded-xl font-bold uppercase tracking-tight"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-black rounded-xl uppercase tracking-tight gap-2"
                    >
                      <Send size={18} />
                      Send Request
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
