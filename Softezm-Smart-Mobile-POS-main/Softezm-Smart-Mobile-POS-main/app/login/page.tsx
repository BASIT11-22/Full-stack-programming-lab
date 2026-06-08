'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Lock, Mail, ArrowRight, Loader2, Smartphone, Store } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useStore();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate a bit of loading for premium feel
    await new Promise(resolve => setTimeout(resolve, 800));

    const success = login(email, password);
    
    if (success) {
      const user = useStore.getState().currentUser;
      toast.success('Welcome back!', {
        description: `Logged in as ${user?.name || 'User'}`,
      });
      
      if (user?.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } else {
      toast.error('Invalid credentials', {
        description: 'Please check your email and password and try again.',
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[450px] relative z-10"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 mb-4"
          >
            <Smartphone size={32} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Softezm <span className="text-primary not-italic">Smart</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium mt-1">Advanced Mobile POS Ecosystem</p>
        </div>

        <Card className="p-8 bg-black/40 border-white/10 backdrop-blur-xl shadow-2xl rounded-3xl relative overflow-hidden group">
          {/* Glass Highlight */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white tracking-tight">Security Access</h2>
              <p className="text-xs text-muted-foreground uppercase font-black tracking-widest">Enter credentials to proceed</p>
            </div>

            <div className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Authentication ID</label>
                <div className="relative group/input">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary transition-colors" size={18} />
                  <Input
                    type="email"
                    placeholder="name@softezm.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/5 border-white/10 h-12 pl-12 rounded-xl focus:ring-primary focus:border-primary text-white placeholder:text-muted-foreground/50 transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Encryption Key</label>
                  <button type="button" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Forgot Key?</button>
                </div>
                <div className="relative group/input">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary transition-colors z-20" size={18} />
                  <PasswordInput
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/5 border-white/10 h-12 pl-12 pr-12 rounded-xl focus:ring-primary focus:border-primary text-white placeholder:text-muted-foreground/50 transition-all"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg shadow-primary/20 group/btn overflow-hidden relative"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="animate-spin" size={20} />
                    Verifying...
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    Authorize Session
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>

            <div className="pt-4 flex flex-col gap-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10" /></div>
                <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest"><span className="bg-black/40 px-2 text-muted-foreground backdrop-blur-md">Trusted By</span></div>
              </div>
              
              <div className="flex justify-center gap-6 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <div className="flex items-center gap-1.5 font-bold text-white tracking-tighter text-sm italic">
                  <Shield size={16} className="text-primary not-italic" />
                  SOFTEZM
                </div>
                <div className="flex items-center gap-1.5 font-bold text-white tracking-tighter text-sm italic">
                  <Store size={16} className="text-blue-400 not-italic" />
                  PARTNER
                </div>
              </div>
            </div>
          </form>
        </Card>

        {/* Footer Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-8"
        >
          Secure Local Environment &copy; {new Date().getFullYear()} Softezm Technologies
        </motion.p>
      </motion.div>
    </div>
  );
}
