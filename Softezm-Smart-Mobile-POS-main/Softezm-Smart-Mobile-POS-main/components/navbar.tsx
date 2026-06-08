'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useStore } from '@/lib/store';

export function Navbar() {
  const { currentUser } = useStore();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <div className="flex items-center justify-between px-6 py-3 max-w-full">
        {/* Search */}
        <div className="flex-1 max-w-md hidden md:flex">
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" size={16} />
            <Input
              type="text"
              placeholder="Quick search commands..."
              className="pl-10 h-10 bg-muted/30 border-none rounded-xl focus-visible:ring-primary text-sm"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Notifications */}
          <Link href="/alerts">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2.5 hover:bg-muted rounded-xl transition-colors"
            >
              <Bell size={20} className="text-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
            </motion.button>
          </Link>

          {/* User menu */}
          <div className="h-8 w-px bg-border mx-2 hidden sm:block" />
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 px-1.5 py-1.5 hover:bg-muted rounded-xl transition-colors cursor-pointer group"
          >
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-xs font-black uppercase tracking-tight text-foreground leading-none">
                {currentUser?.name || (currentUser?.role === 'admin' ? 'Admin' : 'Owner')}
              </span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none mt-1">
                {currentUser?.storeName || currentUser?.role || 'User'}
              </span>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black shadow-lg shadow-primary/5 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              {currentUser?.name 
                ? currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
                : (currentUser?.role === 'admin' ? 'AD' : 'OW')}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
