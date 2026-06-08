'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, Moon, Sun, Monitor, Save, Bell, DollarSign } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useStoreHydration } from '@/hooks/use-store-hydration';
import { toast } from 'sonner';

export default function AdminSettingsPage() {
  const { adminSettings, updateAdminSettings } = useStore();
  const isHydrated = useStoreHydration();

  const [formData, setFormData] = useState({
    email: adminSettings.email,
    password: adminSettings.password || '',
  });

  if (!isHydrated) return null;

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminSettings(formData);
    toast.success('Admin profile updated successfully');
  };

  const toggleTheme = () => {
    const newTheme = adminSettings.theme === 'light' ? 'dark' : 'light';
    updateAdminSettings({ theme: newTheme });
    toast.success(`Theme switched to ${newTheme} mode`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-8 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-foreground uppercase tracking-tight">System Settings</h1>
        <p className="text-muted-foreground mt-1">Configure your administrative preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar Tabs (Simulated) */}
        <div className="space-y-2">
          {[
            { name: 'General', icon: Monitor, active: true },
            { name: 'Security', icon: Shield, active: false },
            { name: 'Notifications', icon: Bell, active: false },
          ].map((tab) => (
            <button
              key={tab.name}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-tight transition-all ${
                tab.active ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <tab.icon size={18} />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-2 space-y-8">
          {/* Profile Section */}
          <Card className="p-8 border-none shadow-xl shadow-primary/5 space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="font-black text-foreground uppercase tracking-tight">Admin Profile</h3>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Core Credentials</p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Admin Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-12 h-12 bg-background border-border/50 focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Change Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-20" size={18} />
                  <PasswordInput
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-12 h-12 bg-background border-border/50 focus:border-primary"
                    placeholder="New Password"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl uppercase tracking-tight flex items-center justify-center gap-2">
                <Save size={18} />
                Save Profile
              </Button>
            </form>
          </Card>

          {/* Theme Section */}
          <Card className="p-8 border-none shadow-xl shadow-primary/5 flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-950/20 rounded-2xl flex items-center justify-center text-orange-600">
                {adminSettings.theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
              </div>
              <div>
                <h3 className="font-black text-foreground uppercase tracking-tight">System Theme</h3>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Toggle UI Appearance</p>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="relative w-16 h-8 bg-muted rounded-full p-1 transition-colors group-hover:bg-muted/80"
            >
              <motion.div
                animate={{ x: adminSettings.theme === 'dark' ? 32 : 0 }}
                className="w-6 h-6 bg-background rounded-full shadow-lg flex items-center justify-center text-foreground"
              >
                {adminSettings.theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
              </motion.div>
            </button>
          </Card>

          {/* Currency Section */}
          <Card className="p-8 border-none shadow-xl shadow-primary/5 flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950/20 rounded-2xl flex items-center justify-center text-blue-600">
                <DollarSign size={24} />
              </div>
              <div>
                <h3 className="font-black text-foreground uppercase tracking-tight">Global Currency</h3>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Applied to all pricing</p>
              </div>
            </div>

            <select
              value={adminSettings.currency}
              onChange={(e) => {
                updateAdminSettings({ currency: e.target.value });
                toast.success(`Currency updated to ${e.target.value}`);
              }}
              className="h-10 bg-muted border-none rounded-xl px-4 text-xs font-black uppercase tracking-tight focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="Rs.">PKR (Rs.)</option>
              <option value="$">USD ($)</option>
              <option value="€">EUR (€)</option>
              <option value="£">GBP (£)</option>
              <option value="¥">JPY (¥)</option>
            </select>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
