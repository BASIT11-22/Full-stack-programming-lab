'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Smartphone,
  ShoppingCart,
  BarChart3,
  Settings,
  Menu,
  X,
  Package,
  Clock,
  History,
  Users,
  ShieldCheck,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/lib/store';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const pathname = usePathname();
  const { currentUser } = useStore();

  const adminNav = [
    { name: 'Admin Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Owners', href: '/admin/owners', icon: Users },
    { name: 'Credential Requests', href: '/admin/requests', icon: ShieldCheck },
    { name: 'Subscription History', href: '/admin/history', icon: History },
    { name: 'Admin Settings', href: '/admin/settings', icon: Settings },
  ];

  const ownerNav = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Mobile Phones', href: '/inventory/phones', icon: Smartphone },
    { name: 'Accessories', href: '/inventory/accessories', icon: Package },
    { name: 'Point of Sale', href: '/sales/pos', icon: ShoppingCart },
    { name: 'Pending Payments', href: '/sales/pending', icon: Clock },
    { name: 'Sales History', href: '/sales/history', icon: History },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const navigation = currentUser?.role === 'admin' ? adminNav : ownerNav;

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-sidebar text-sidebar-foreground p-2 rounded-md"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          x: (isOpen || isDesktop) ? 0 : '-100%' 
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'fixed lg:sticky top-0 left-0 h-screen w-64 bg-sidebar border-r border-sidebar-border z-40 shadow-xl lg:shadow-none flex flex-col',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-2xl font-black text-sidebar-primary tracking-tighter uppercase">Softezm POS</h1>
          <p className="text-[10px] font-bold text-sidebar-foreground/60 uppercase tracking-widest mt-1">Enterprise Solution</p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <motion.div
                key={item.href}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-sidebar-primary/20'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/20'
                  )}
                >
                  <Icon size={20} />
                  <span className="font-bold text-sm uppercase tracking-tight">{item.name}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const { logout } = useStore.getState();
              logout();
              window.location.href = '/login';
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
          >
            <LogOut size={20} />
            <span className="font-bold text-sm uppercase tracking-tight">Logout System</span>
          </motion.button>
        </div>
      </motion.aside>
    </>
  );
}
